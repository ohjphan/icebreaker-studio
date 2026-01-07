# Icebreaker Studio - Quick Start Guide

## 🎉 Your App is Ready!

The development server is running at: **http://localhost:3001**

## 📋 What You Need

Nothing! The app works immediately with 55+ pre-written icebreaker questions. No API keys, no setup, no configuration needed.

## 🚀 First Steps

### 1. Open the App
Simply visit http://localhost:3001 in your browser.

### 2. Set Your Preferences

**Tone** (Multi-select):
- 😈 **Extreme** - Bold, vulnerable questions
- 😂 **Funny** - Playful and humorous
- 🙂 **Light** - Easy and comfortable
- 🤔 **Thoughtful** - Reflective and meaningful
- 🎯 **Serious** - Professional and focused

Mix multiple tones for varied questions!

**Depth** (Slider):
- **Surface** - Quick, fun, low-stakes (2-5 min answers)
- **Medium** - Balanced reflection (5-10 min answers)
- **Deep** - Meaningful, values-based (10+ min answers)

**Topics** (Optional):
- Select specific topics or leave empty for random
- Mix multiple topics for varied questions

**Time**:
- **2 min** - Quick, one-word answers
- **5 min** - Brief stories (default)
- **10 min** - Deeper sharing

**Safety Settings**:
- **Psychological Safety Mode** (ON by default) - All questions are pre-vetted to avoid trauma, loss, sensitive topics
- **Opt-Out Friendly** (ON by default) - All questions allow light/humorous answers without pressure

### 3. Generate Questions

**Option A: Generate Question**
- Uses your current filter settings
- Click to get a question matching your preferences
- The app finds the best match from 55+ curated questions

**Option B: Surprise Me (Safe)**
- Resets to safe defaults (Light + Thoughtful, Medium depth)
- Perfect for first-time use or when you're unsure

**Re-roll**:
- Don't like the question? Click "Re-roll" to get another with the same settings

## 💡 Usage Scenarios

### New Team Kickoff
```
Tone: Light + Thoughtful
Depth: Medium
Topics: Personal Interests
Time: 5 min
```
Example: "What's a small thing that instantly improves your day?"

### Weekly Team Standup
```
Tone: Light + Funny
Depth: Surface
Topics: Random
Time: 2 min
```
Example: "What emoji best describes your week so far?"

### Quarterly Retrospective
```
Tone: Thoughtful + Serious
Depth: Deep
Topics: Learning + Values
Time: 10 min
```
Example: "What motivates you when work gets hard?"

### Team Building Session
```
Tone: Funny + Thoughtful
Depth: Medium
Topics: Creativity + Memories
Time: 5 min
```
Example: "What's the best concert or live event you've ever been to?"

## 🎯 Tips for Success

1. **Start Safe**: Use default settings for your first few sessions
2. **Read the Room**: Match tone and depth to your team's energy
3. **Go First**: As the facilitator, answer the question first to set the tone
4. **Time It**: Use a timer to keep things moving
5. **Make It Optional**: Always let people pass or give brief answers
6. **Mix It Up**: Change settings over time to keep things fresh

## 📊 Question Library

The app includes **55 carefully curated questions** covering:
- **Funny + Surface**: 5 questions (quick laughs)
- **Light + Surface**: 5 questions (easy warmups)
- **Thoughtful + Medium**: 8 questions (core icebreakers)
- **Serious + Medium/Deep**: 4 questions (work-focused)
- **Deep + Thoughtful**: 5 questions (meaningful reflection)
- **Extreme + Deep**: 3 questions (bold conversations)
- **Creativity Focused**: 4 questions (imagination)
- **Work Style**: 4 questions (collaboration)
- **Memories**: 4 questions (stories)
- **Learning**: 4 questions (growth)
- **Mixed/Wildcard**: 9 questions (variety)

### How Filtering Works
The app uses a smart matching algorithm that:
1. **Scores each question** based on how well it matches your filters
2. **Prioritizes tone and depth** (most important factors)
3. **Considers topics** (if you select any)
4. **Matches time length** (quick vs story-based)
5. **Randomly selects** from the best matches to keep things fresh

## ⚠️ Troubleshooting

### "Please select at least one tone"
- You need to select at least one tone chip to generate questions
- Try "Surprise Me (Safe)" for instant results

### "No questions match your filters"
- Your filter combination is too specific
- Try selecting fewer topics or adjusting tone/depth
- Use "Surprise Me (Safe)" to reset to defaults

### Questions feel repetitive
- Try different tone combinations
- Select different topics
- Mix multiple tones for more variety
- The library has 55+ questions, but with narrow filters you may see repeats

## 🔄 Adding More Questions (For Developers)

Want to expand the library? Edit `/lib/questions-library.ts`:

```typescript
{
  id: 'q56', // Unique ID
  text: "Your question here?",
  tones: ['thoughtful', 'light'], // Which tones fit?
  depth: 'medium', // surface | medium | deep
  topics: ['work-style', 'learning'], // Which topics?
  timeLength: '5min', // 2min | 5min | 10min
}
```

## 🌐 Deployment

To deploy your app to production:

1. **Vercel** (Recommended):
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**:
   ```bash
   npm run build
   # Deploy the .next folder
   ```

3. **Any static host**: The app is fully client-side and requires no backend

## 🎨 Customization

Want to customize the app? Check these files:

- **Add/edit questions**: `lib/questions-library.ts`
- **Change colors**: `app/globals.css` (search for `--primary`, `--secondary`, etc.)
- **Change fonts**: `app/layout.tsx`
- **Adjust filtering logic**: `lib/question-generator.ts`
- **Modify topics/tones**: `types/index.ts`

## 🆘 Need Help?

- Check the README.md for technical details
- Review the question library in `lib/questions-library.ts`
- Inspect browser console for errors
- All questions are safe and pre-vetted!

---

Enjoy building stronger team connections! 🎉

**No API keys. No setup. Just better meetings.** ✨
