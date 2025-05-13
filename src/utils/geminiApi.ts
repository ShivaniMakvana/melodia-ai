import { LyricGenParams } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function generateLyrics(params: LyricGenParams): Promise<string> {
  const { prompt, genre, mood, additionalContext } = params;

  const promptText = `
    As an AI music composer, write original song lyrics with the following specifications:
    
    Genre: ${genre}
    Mood: ${mood}
    Prompt/Theme: ${prompt}
    ${additionalContext ? `Additional context: ${additionalContext}` : ''}
    
    The lyrics should include:
    - A catchy chorus
    - At least 2-3 verses
    - A bridge (optional)
    - An outro
    
    Format the lyrics with clear section labels (Verse 1, Chorus, etc.) and line breaks.
    Create a title for the song at the top. Make the lyrics emotionally resonant and true to the genre's style.
  `;

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: promptText,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating lyrics:', error);
    throw error;
  }
}

export function extractTitle(lyricsText: string): string {
  // Look for the title at the beginning of the lyrics
  const lines = lyricsText.trim().split('\n');
  
  // Try to find a line that might be the title (typically the first non-empty line)
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.toLowerCase().startsWith('verse') && 
        !trimmedLine.toLowerCase().startsWith('chorus') && 
        !trimmedLine.toLowerCase().startsWith('bridge') && 
        !trimmedLine.toLowerCase().includes('title:')) {
      // If it's a short line (likely a title) or explicitly marked as "Title:"
      if (trimmedLine.length < 50) {
        return trimmedLine.replace(/^"(.+)"$/, '$1').replace(/^Title:?\s*/i, '');
      }
    }
  }
  
  // Fallback if no title found
  return 'Untitled Song';
}