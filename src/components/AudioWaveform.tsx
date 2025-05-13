import React, { useEffect, useRef } from 'react';

interface AudioWaveformProps {
  isPlaying: boolean;
  color?: string;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ 
  isPlaying,
  color = '#EC4899' // Default to pink
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Make sure canvas dimensions match the displayed size
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Animation variables
    const bars = 60;
    const barWidth = canvas.width / bars - 2;
    const amplitudes = Array(bars).fill(0).map(() => Math.random() * 0.5);
    const speeds = Array(bars).fill(0).map(() => 0.1 + Math.random() * 0.1);
    
    let time = 0;
    
    const draw = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Stop animation if not playing
      if (!isPlaying) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        
        // Draw static bars when not playing
        ctx.fillStyle = color;
        const staticHeight = canvas.height * 0.15;
        
        for (let i = 0; i < bars; i++) {
          const x = i * (barWidth + 2);
          const y = canvas.height / 2 - staticHeight / 2;
          ctx.fillRect(x, y, barWidth, staticHeight);
        }
        
        return;
      }
      
      time += 0.05;
      
      // Draw animated bars
      ctx.fillStyle = color;
      
      for (let i = 0; i < bars; i++) {
        const amplitude = amplitudes[i];
        const speed = speeds[i];
        
        // Calculate height using sine wave for smooth animation
        const height = (Math.sin(time * speed + i * 0.2) * 0.5 + 0.5) * 
                       canvas.height * amplitude * 0.8 + 
                       canvas.height * 0.15;
        
        const x = i * (barWidth + 2);
        const y = canvas.height / 2 - height / 2;
        
        ctx.fillRect(x, y, barWidth, height);
      }
      
      rafRef.current = requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isPlaying, color]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-24 rounded-lg"
    />
  );
};

export default AudioWaveform;