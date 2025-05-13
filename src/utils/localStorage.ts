import { GeneratedLyric } from '../types';

const STORAGE_KEY = 'melodia_history';

export function saveGeneratedLyric(lyric: GeneratedLyric): void {
  try {
    const existing = getGeneratedLyrics();
    const updated = [lyric, ...existing];
    
    // Keep only the most recent 20 items
    const trimmed = updated.slice(0, 20);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Error saving lyrics to local storage:', error);
  }
}

export function getGeneratedLyrics(): GeneratedLyric[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving lyrics from local storage:', error);
    return [];
  }
}

export function clearGeneratedLyrics(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing lyrics from local storage:', error);
  }
}