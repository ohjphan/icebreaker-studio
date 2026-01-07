import { FilterState, Tone, Depth, Topic } from '@/types';

export function buildPrompt(filters: FilterState): string {
  const { tones, depth, topics, timeLength, safety } = filters;

  // Map tones to descriptive language
  const toneDescriptions: Record<Tone, string> = {
    extreme: 'bold and thought-provoking, pushing boundaries',
    funny: 'humorous and playful, making people laugh',
    light: 'comfortable and easy-going, keeping things casual',
    thoughtful: 'reflective and meaningful, encouraging insight',
    serious: 'professional and focused, work-oriented',
  };

  const selectedToneDescriptions = tones.map(t => toneDescriptions[t]).join(' and ');

  // Map depth to complexity guidelines
  const depthGuidelines: Record<Depth, string> = {
    surface: 'Keep it simple and fun. Questions should be quick to answer, low-stakes, and require minimal vulnerability. Think preferences, favorites, or silly hypotheticals.',
    medium: 'Balance depth with accessibility. Questions should invite genuine reflection without being too heavy. People should feel comfortable sharing real thoughts.',
    deep: 'Encourage meaningful reflection and authentic sharing. Questions can explore values, growth, motivations, or experiences that shaped someone. Still respect boundaries.',
  };

  const depthGuideline = depthGuidelines[depth];

  // Map topics to content domains
  const topicDescriptions: Record<Topic, string> = {
    'personal': 'personal interests, hobbies, or things they love outside of work',
    'work': 'work style, collaboration preferences, or how they approach their job',
    'creative': 'creativity, imagination, or thinking in new ways',
    'reflective': 'values, motivations, growth, or meaningful experiences',
  };

  const topicFocus = topics.length > 0
    ? `Focus the question on: ${topics.map(t => topicDescriptions[t]).join(', ')}.`
    : 'The question can be about any topic.';

  // Time-based guidance
  const timeGuidance: Record<string, string> = {
    '2min': 'This is for a quick icebreaker (2 minutes). Keep answers short - one word, one sentence, or a quick share. Format as a rapid-fire question.',
    '5min': 'This is for a standard icebreaker (5 minutes). Answers should take 30-60 seconds per person. Allow for brief stories or explanations.',
    '10min': 'This is for a longer icebreaker (10 minutes). Encourage storytelling and deeper sharing. People should have time to elaborate.',
  };

  const timeGuideline = timeGuidance[timeLength];

  // Safety guidelines
  const safetyGuidance = safety.psychologicalSafety
    ? `CRITICAL SAFETY REQUIREMENTS:
- Avoid questions about trauma, loss, grief, or painful experiences
- Avoid identity-sensitive topics (race, religion, politics, etc.)
- Avoid questions that force vulnerability or personal disclosure
- Make sure the question is opt-out friendly - people should be able to give light or humorous answers without pressure
- Never ask about regrets, failures, or painful moments`
    : `The question can be more vulnerable, but still respect basic boundaries. Avoid trauma or deeply painful topics.`;

  // Build the complete prompt
  const prompt = `You are an expert facilitator creating icebreaker questions for team meetings.

TONE: ${selectedToneDescriptions}

DEPTH: ${depthGuideline}

TOPICS: ${topicFocus}

TIME: ${timeGuideline}

SAFETY: ${safetyGuidance}

${safety.optOutFriendly ? 'IMPORTANT: The question must allow for light, humorous, or brief answers. No one should feel pressured to share something heavy or personal.' : ''}

Generate ONE icebreaker question that matches ALL the criteria above.

Requirements:
- Return ONLY the question itself, no preamble, no explanation, no quotes
- Make it feel natural and conversational, not corporate or forced
- Ensure it matches the tone and depth specified
- Make it specific enough to be interesting but broad enough that everyone can answer
- For team meetings of 5-8 people

Your response should be just the question, nothing else.`;

  return prompt;
}

