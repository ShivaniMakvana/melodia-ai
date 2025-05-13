import React from 'react';
import { GeneratedLyric } from '../types';
import { Share2, Download, Copy } from 'lucide-react';

interface LyricsDisplayProps {
  lyric: GeneratedLyric;
  isGenerating: boolean;
}

const LyricsDisplay: React.FC<LyricsDisplayProps> = ({ lyric, isGenerating }) => {
  const formattedContent = lyric.content
    .split('\n')
    .map((line, i) => {
      // Style section headers (Verse, Chorus, etc.) differently
      if (
        line.toLowerCase().includes('verse') ||
        line.toLowerCase().includes('chorus') ||
        line.toLowerCase().includes('bridge') ||
        line.toLowerCase().includes('outro') ||
        line.toLowerCase().includes('intro')
      ) {
        return (
          <h3 key={i} className="text-lg font-semibold text-purple-700 mt-4 mb-2">
            {line}
          </h3>
        );
      }
      
      // Empty lines for spacing
      if (!line.trim()) {
        return <br key={i} />;
      }
      
      // Regular text
      return <p key={i} className="my-1">{line}</p>;
    });

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(lyric.content);
    // Could add a toast notification here
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: lyric.title,
        text: lyric.content,
      }).catch(err => console.error('Error sharing content:', err));
    } else {
      handleCopyToClipboard();
      // Show a toast that it was copied instead
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([lyric.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${lyric.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (isGenerating) {
    return (
      <div className="animate-pulse bg-gray-100 rounded-lg p-6 h-full min-h-[400px]">
        <div className="h-7 bg-gray-300 rounded w-1/3 mb-8"></div>
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-300 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!lyric.content) {
    return (
      <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center justify-center border border-gray-200">
        <p className="text-gray-500 text-center">
          Your lyrics will appear here after generation
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-6 shadow-md flex flex-col justify-between overflow-auto border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-purple-900">{lyric.title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleCopyToClipboard}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Share"
          >
            <Share2 className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Download"
          >
            <Download className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="mt-4 text-gray-800">
        {formattedContent}
      </div>
      <div className="mt-4 pt-4 mb-0 pb-0 border-t border-gray-200 flex justify-between text-sm text-gray-500">
        <div>Genre: <span className="font-medium">{lyric.genre}</span></div>
        <div>Mood: <span className="font-medium">{lyric.mood}</span></div>
      </div>
    </div>
  );
};

export default LyricsDisplay;