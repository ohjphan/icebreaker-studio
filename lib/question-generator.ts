import { FilterState } from '@/types';
import { CURATED_QUESTIONS, CuratedQuestion } from './questions-library';

export interface GenerateQuestionResult {
  success: boolean;
  question?: string;
  error?: string;
}

function questionsMatchFilter(question: CuratedQuestion, filters: FilterState): number {
  let score = 0;

  // Tone matching (higher priority)
  const toneMatches = question.tones.includes(filters.tone);
  if (toneMatches) {
    score += 10;
  }

  // Depth matching (high priority)
  if (question.depth === filters.depth) {
    score += 8;
  } else {
    // Partial credit for adjacent depths
    const depthOrder = ['surface', 'medium', 'deep'];
    const questionDepthIndex = depthOrder.indexOf(question.depth);
    const filterDepthIndex = depthOrder.indexOf(filters.depth);
    const depthDistance = Math.abs(questionDepthIndex - filterDepthIndex);
    if (depthDistance === 1) {
      score += 4;
    }
  }

  // Topic matching (medium priority)
  if (filters.topic !== null) {
    const topicMatches = question.topics.includes(filters.topic);
    if (topicMatches) {
      score += 6;
    }
  } else {
    // If no topic selected, all questions work
    score += 3;
  }

  // Time matching (lower priority, but still considered)
  if (question.timeLength === filters.timeLength) {
    score += 3;
  }

  // Safety filtering (mandatory - questions are pre-filtered to be safe)
  // All curated questions are already vetted for safety
  if (filters.safety.psychologicalSafety) {
    // All our questions are safe by default
    score += 1;
  }

  return score;
}

export async function generateQuestion(filters: FilterState): Promise<GenerateQuestionResult> {
  try {
    // Tone is always selected (required field in FilterState)

    // Score all questions based on how well they match the filters
    const scoredQuestions = CURATED_QUESTIONS.map(q => ({
      question: q,
      score: questionsMatchFilter(q, filters),
    }));

    // Sort by score (highest first)
    scoredQuestions.sort((a, b) => b.score - a.score);

    // Get top matches (questions with score >= threshold)
    const threshold = 10; // Minimum score to be considered a good match
    const goodMatches = scoredQuestions.filter(sq => sq.score >= threshold);

    if (goodMatches.length === 0) {
      // If no good matches, fall back to any questions that match tone
      const anyMatches = scoredQuestions.filter(sq => sq.score > 0);
      if (anyMatches.length === 0) {
        return {
          success: false,
          error: 'No questions match your filters. Try adjusting your selections.',
        };
      }
      // Pick random from any matches
      const randomIndex = Math.floor(Math.random() * anyMatches.length);
      return {
        success: true,
        question: anyMatches[randomIndex].question.text,
      };
    }

    // Pick a random question from the good matches
    const randomIndex = Math.floor(Math.random() * goodMatches.length);
    const selectedQuestion = goodMatches[randomIndex].question;

    return {
      success: true,
      question: selectedQuestion.text,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || 'Failed to generate question. Please try again.',
    };
  }
}
