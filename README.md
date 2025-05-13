# AI Lyric Generator

A beautiful web application that generates creative song lyrics using Google's Gemini AI. Built with React, TypeScript, and Tailwind CSS.

<a href="https://melodia-ai.vercel.app"> <img src="https://github.com/shivanimakvana/melodia-ai/blob/main/banner.png"></a>


## Features

- 🎵 Generate unique song lyrics based on your prompts
- 🎨 Choose from multiple genres and moods
- 💾 Automatic history saving
- 📋 Copy, share, and download generated lyrics
- 🎯 Responsive design for all devices
- ✨ Beautiful animations and transitions

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Google Gemini API
- Vite
- Lucide React Icons

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-lyric-generator.git
cd ai-lyric-generator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. Enter a prompt describing what you want your lyrics to be about
2. Select a genre and mood for your lyrics
3. (Optional) Add additional context for more specific results
4. Click "Generate Lyrics" and wait for the magic to happen
5. Copy, share, or download your generated lyrics
6. Access your generation history anytime

## Project Structure

```
src/
├── components/         # React components
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Powered by Google Gemini API
- Created with 💜 by Shivani
- Icons by Lucide React
- Inspired by Suno.ai
