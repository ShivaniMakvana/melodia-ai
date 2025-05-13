import React from 'react';
import { Music } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-900 to-indigo-800 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Music className="h-7 w-7 text-pink-400" />
          <h1 className="text-2xl font-bold">Melodia</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/shivanimakvana/melodia-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-pink-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://suno.com"
            target="_blank"
            rel="noopener noreferrer" 
            className="text-white hover:text-pink-300 transition-colors"
          >
            Inspired by Suno
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;