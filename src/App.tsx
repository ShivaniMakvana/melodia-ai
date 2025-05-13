import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar';
import GeneratorForm from './components/GeneratorForm';
import LyricsDisplay from './components/LyricsDisplay';
import GenerationProgress from './components/GenerationProgress';
import HistoryPanel from './components/HistoryPanel';
import { LyricGenParams, GeneratedLyric, MusicGenState } from './types';
import { generateLyrics, extractTitle } from './utils/geminiApi';
import { saveGeneratedLyric, getGeneratedLyrics } from './utils/localStorage';
import { simulateMusicGeneration } from './utils/musicGeneration';
import { Music } from 'lucide-react';

function App() {
  const [generatedLyric, setGeneratedLyric] = useState<GeneratedLyric>({
    id: '',
    title: '',
    content: '',
    genre: 'pop',
    mood: 'happy',
    prompt: '',
    timestamp: 0
  });
  
  const [genState, setGenState] = useState<MusicGenState>({
    status: 'idle',
    progress: 0,
    currentStep: ''
  });
  
  const [history, setHistory] = useState<GeneratedLyric[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  useEffect(() => {
    const savedLyrics = getGeneratedLyrics();
    setHistory(savedLyrics);
  }, []);
  
  const handleGenerate = async (params: LyricGenParams) => {
    try {
      setGenState({
        status: 'generating',
        progress: 0,
        currentStep: 'Analyzing prompt...'
      });
      
      const lyricsContent = await generateLyrics(params);
      const title = extractTitle(lyricsContent);
      
      const newLyric: GeneratedLyric = {
        id: uuidv4(),
        title,
        content: lyricsContent,
        genre: params.genre,
        mood: params.mood,
        prompt: params.prompt,
        timestamp: Date.now()
      };
      
      setGeneratedLyric(newLyric);
      saveGeneratedLyric(newLyric);
      setHistory([newLyric, ...history]);
      
      // Complete generation immediately since we're not generating music
      setGenState({
        status: 'complete',
        progress: 100,
        currentStep: 'Lyrics generated successfully!'
      });
      
      setTimeout(() => {
        setGenState({ status: 'idle', progress: 0, currentStep: '' });
      }, 2000);
      
    } catch (error) {
      console.error('Error in generation:', error);
      setGenState({
        status: 'error',
        progress: 0,
        currentStep: 'Error: Could not generate lyrics. Please try again.'
      });
    }
  };
  
  const handleSelectFromHistory = (lyric: GeneratedLyric) => {
    setGeneratedLyric(lyric);
    setShowHistory(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-600 text-gray-900 flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            AI Lyric Generator
          </h1>
          <p className="text-xl text-pink-200">
            Create beautiful lyrics with the power of AI
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Create Lyrics</h2>
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1 rounded-full text-sm font-medium transition-all"
              >
                {showHistory ? 'Hide History' : 'Show History'}
              </button>
            </div>
            
            {showHistory ? (
              <HistoryPanel 
                history={history}
                onSelect={handleSelectFromHistory}
              />
            ) : (
              <GeneratorForm 
                onGenerate={handleGenerate}
                isGenerating={genState.status === 'generating'}
              />
            )}
          </div>
          
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Your Lyrics</h2>
            <GenerationProgress state={genState} />
            <LyricsDisplay 
              lyric={generatedLyric}
              isGenerating={genState.status === 'generating'}
            />
          </div>
        </div>
        
        <div className="fixed bottom-10 left-10 opacity-20 rotate-12">
          <Music size={40} className="text-pink-200" />
        </div>
        <div className="fixed top-40 right-10 opacity-20 -rotate-12">
          <Music size={32} className="text-purple-200" />
        </div>
      </main>
      
      <footer className="bg-black bg-opacity-30 text-center py-4 text-white text-sm">
        <div className="container mx-auto">
          <p>
            Powered by Google Gemini API | Created with 💜 by Shivani
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;