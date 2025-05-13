import React from 'react';
import { GeneratedLyric } from '../types';
import { Clock, RefreshCcw } from 'lucide-react';

interface HistoryPanelProps {
  history: GeneratedLyric[];
  onSelect: (lyric: GeneratedLyric) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect }) => {
  if (history.length === 0) {
    return (
      <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-6 shadow-md border border-gray-200 text-center">
        <Clock className="h-12 w-12 mx-auto text-gray-400 mb-3" />
        <h3 className="text-lg font-medium text-gray-700">No History Yet</h3>
        <p className="text-gray-500 mt-2">
          Generated lyrics will appear here for easy access.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-4 bg-purple-100 border-b border-purple-200">
        <h3 className="text-lg font-semibold text-purple-800">Generation History</h3>
        <p className="text-sm text-gray-600">Select a previous generation to view</p>
      </div>
      
      <div className="divide-y divide-gray-200 max-h-[500px] overflow-auto">
        {history.map((lyric) => (
          <div 
            key={lyric.id}
            onClick={() => onSelect(lyric)}
            className="p-4 hover:bg-purple-50 cursor-pointer transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-purple-800">{lyric.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{lyric.prompt.substring(0, 60)}{lyric.prompt.length > 60 ? '...' : ''}</p>
              </div>
              <button 
                className="text-purple-600 hover:text-purple-800 p-1 rounded-full hover:bg-purple-100 transition-colors"
                title="Load this song"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(lyric);
                }}
              >
                <RefreshCcw size={16} />
              </button>
            </div>
            
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <span className="bg-gray-200 rounded-full px-2 py-0.5 mr-2">{lyric.genre}</span>
              <span className="bg-gray-200 rounded-full px-2 py-0.5 mr-2">{lyric.mood}</span>
              <span>{new Date(lyric.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;