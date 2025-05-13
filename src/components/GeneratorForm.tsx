import React, { useState } from 'react';
import { Genre, Mood, LyricGenParams } from '../types';

interface GeneratorFormProps {
  onGenerate: (params: LyricGenParams) => void;
  isGenerating: boolean;
}

const genres: Genre[] = [
  'pop', 'rock', 'hip-hop', 'r&b', 'country', 
  'electronic', 'jazz', 'classical', 'folk', 'indie'
];

const moods: Mood[] = [
  'happy', 'sad', 'energetic', 'calm', 'romantic',
  'angry', 'nostalgic', 'hopeful', 'anxious', 'reflective'
];

const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre] = useState<Genre>('pop');
  const [mood, setMood] = useState<Mood>('happy');
  const [additionalContext, setAdditionalContext] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onGenerate({
      prompt,
      genre,
      mood,
      additionalContext: additionalContext.trim() || undefined
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-6 shadow-md border border-gray-200">
      <div className="mb-6">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
          What would you like to write lyrics about?
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A summer road trip with friends, finding love in a coffee shop..."
          required
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
            Genre
          </label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value as Genre)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-1">
            Mood
          </label>
          <select
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value as Mood)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {moods.map((m) => (
              <option key={m} value={m}>
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
        >
          {expanded ? 'Hide' : 'Show'} advanced options
          <span className="ml-1">{expanded ? '▲' : '▼'}</span>
        </button>

        {expanded && (
          <div className="mt-4 animate-fadeIn">
            <label htmlFor="additionalContext" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Context (optional)
            </label>
            <textarea
              id="additionalContext"
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              placeholder="Any specific themes, instruments, or style preferences..."
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isGenerating || !prompt.trim()}
        className={`w-full py-3 px-4 rounded-md font-medium text-white ${
          isGenerating || !prompt.trim()
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-md hover:shadow-lg transition-all'
        }`}
      >
        {isGenerating ? 'Generating...' : 'Generate Lyrics'}
      </button>
    </form>
  );
};

export default GeneratorForm;