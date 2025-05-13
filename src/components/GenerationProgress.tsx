import React, { useEffect, useState } from 'react';
import { MusicGenState } from '../types';
import AudioWaveform from './AudioWaveform';

interface GenerationProgressProps {
  state: MusicGenState;
}

const GenerationProgress: React.FC<GenerationProgressProps> = ({ state }) => {
  const [showWaveform, setShowWaveform] = useState(false);
  
  useEffect(() => {
    // Only show waveform when actually generating
    if (state.status === 'generating' && state.progress > 10) {
      setShowWaveform(true);
    }
    
    // Hide waveform briefly after completion
    if (state.status === 'complete') {
      const timer = setTimeout(() => {
        setShowWaveform(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
    
    if (state.status === 'idle') {
      setShowWaveform(false);
    }
  }, [state.status, state.progress]);
  
  if (state.status === 'idle') {
    return null;
  }
  
  const bgClass = state.status === 'complete' 
    ? 'bg-green-50 border-green-200' 
    : 'bg-purple-50 border-purple-200';
    
  const progressColor = state.status === 'complete' 
    ? 'bg-green-500' 
    : 'bg-gradient-to-r from-purple-600 to-pink-500';
  
  return (
    <div className={`rounded-lg p-6 mb-6 border ${bgClass} transition-all`}>
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {state.currentStep}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.round(state.progress)}%
          </span>
        </div>
        
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${progressColor} transition-all duration-300 ease-out`}
            style={{ width: `${state.progress}%` }}
          />
        </div>
      </div>
      
      {showWaveform && (
        <div className="mt-4 transition-opacity duration-500 ease-in-out">
          <AudioWaveform 
            isPlaying={state.status === 'generating'} 
            color={state.status === 'complete' ? '#10B981' : '#EC4899'}
          />
        </div>
      )}
    </div>
  );
};

export default GenerationProgress;