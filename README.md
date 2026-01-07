# Icebreaker Studio

A curated icebreaker question generator that helps teams spark genuine connection in 2-5 minutes.

## 🎯 Overview

Icebreaker Studio provides 55+ hand-crafted icebreaker questions for team meetings. The app intelligently filters questions based on:

- **Tone**: Extreme, Funny, Light, Thoughtful, Serious (multi-select)
- **Depth**: Surface, Medium, Deep
- **Topics**: Personal interests, Work style, Creativity, Values, Memories, Learning, Wildcard
- **Time**: 2 min, 5 min, or 10 min meetings
- **Safety Settings**: Psychological Safety Mode and Opt-Out Friendly options

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### First-Time Setup

No setup needed! The app comes with 55+ pre-written questions and works immediately out of the box.

## 🎨 Features

### Core Features
- **55+ Curated Questions**: Hand-crafted questions across all tone/depth/topic combinations
- **Smart Filtering**: Intelligent matching algorithm finds the best questions for your filters
- **Flexible Filtering**: Mix and match tones, depths, and topics for varied questions
- **Safety First**: All questions are pre-vetted for psychological safety
- **Responsive Design**: Works beautifully on desktop and mobile
- **No Dependencies**: No API keys needed, works offline, fully client-side

### User Experience
- **Default Safe Settings**: Light + Thoughtful tone, Medium depth, Safety ON
- **"Surprise Me (Safe)"**: One-click generation with safe defaults
- **Re-roll**: Don't like a question? Generate a new one with the same filters
- **Clean, Playful UI**: Warm colors, rounded corners, and friendly design

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **UI Components**: shadcn/ui with Tailwind CSS
- **Question Library**: 55+ curated questions with smart filtering
- **Icons**: Lucide React
- **Language**: TypeScript

## 📁 Project Structure

```
/app
  /page.tsx                    # Main app page
  /layout.tsx                  # Root layout
  /globals.css                 # Global styles with warm color palette
/components
  /question-display.tsx        # Question card display
  /control-panel.tsx           # All filters container
  /tone-selector.tsx           # Tone multi-select chips
  /depth-slider.tsx            # Depth slider
  /topic-selector.tsx          # Topic multi-select
  /time-selector.tsx           # Meeting length buttons
  /safety-toggles.tsx          # Safety switches
  /settings-modal.tsx          # API key management (unused in MVP)
  /ui/*                        # shadcn components
/lib
  /questions-library.ts        # 55+ curated questions
  /question-generator.ts       # Smart filtering algorithm
  /utils.ts                    # Helper functions
/types
  /index.ts                    # TypeScript types
```

## 🎯 Design Philosophy

Icebreaker Studio follows these principles:

1. **Respect first, fun second** - Never force vulnerability
2. **Optional vulnerability, never forced** - Opt-out friendly by default
3. **Low effort, high payoff** - Minimal prep, maximum connection
4. **Human > clever** - Natural questions over corporate speak
5. **Adaptable to team maturity** - Grows with your team

## 🔒 Privacy & Security

- No data collection or tracking
- No external API calls
- Works completely offline (after initial page load)
- No personal information stored
- Fully client-side application

## 🚧 Future Enhancements (Not in V1)

- AI-powered question generation (OpenAI/Anthropic integration)
- Favorites and question history
- Question tagging and feedback
- More curated questions (expand library to 200+)
- Team memory features
- Async icebreakers (Slack/Teams integration)
- Custom question creation

## 📝 Usage Tips

### For New Teams
- Start with **Light + Thoughtful** tones
- Keep depth at **Medium**
- Enable both **Safety toggles**
- Try **Personal Interests** or **Creativity** topics

### For Established Teams
- Mix **Thoughtful + Funny** or **Thoughtful + Serious**
- Experiment with **Deep** depth
- Try **Values** or **Learning** topics
- Consider longer time (10 min) for richer discussions

### Quick Meetings
- Use the **2 min** time setting
- Stick to **Surface** depth
- **Light + Funny** tones work great

## 🤝 Contributing

This is a personal project, but feedback and suggestions are welcome!

## 📄 License

MIT License - feel free to use and modify as needed.

## 💡 Inspiration

Built to solve the problem of awkward, forced, or low-quality icebreakers in team meetings. The goal is to create intentional moments for human connection that build trust, rapport, and psychological safety.

---

**North Star**: "In 2–5 minutes, spark a moment of genuine connection that makes teammates feel more human to each other."
