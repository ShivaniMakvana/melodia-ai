export type Genre = 
  | 'pop' 
  | 'rock' 
  | 'hip-hop' 
  | 'r&b' 
  | 'country' 
  | 'electronic' 
  | 'jazz' 
  | 'classical' 
  | 'folk' 
  | 'indie';

export type Mood = 
  | 'happy' 
  | 'sad' 
  | 'energetic' 
  | 'calm' 
  | 'romantic' 
  | 'angry' 
  | 'nostalgic' 
  | 'hopeful' 
  | 'anxious' 
  | 'reflective';

export interface LyricGenParams {
  prompt: string;
  genre: Genre;
  mood: Mood;
  additionalContext?: string;
}

export interface GeneratedLyric {
  id: string;
  title: string;
  content: string;
  genre: Genre;
  mood: Mood;
  prompt: string;
  timestamp: number;
}

export interface MusicGenState {
  status: 'idle' | 'generating' | 'complete' | 'error';
  progress: number;
  currentStep: string;
}