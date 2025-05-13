import { MusicGenState } from '../types';

// Simulate music generation steps for the UI
export function simulateMusicGeneration(
  callback: (state: MusicGenState) => void,
  complete: () => void
): () => void {
  let cancelled = false;
  
  const steps = [
    "Analyzing lyrical themes...",
    "Generating melodic patterns...",
    "Composing chord progressions...",
    "Creating rhythmic elements...",
    "Adding harmonies...",
    "Finalizing arrangement...",
    "Mixing audio elements...",
    "Preparing final composition..."
  ];

  const totalSteps = steps.length;
  let currentStepIndex = 0;
  
  const updateProgress = () => {
    if (cancelled) return;
    
    if (currentStepIndex < totalSteps) {
      const progress = (currentStepIndex / totalSteps) * 100;
      
      callback({
        status: 'generating',
        progress,
        currentStep: steps[currentStepIndex]
      });
      
      currentStepIndex++;
      
      // Random time between 1-2.5 seconds for each step
      const nextUpdateTime = 1000 + Math.random() * 1500;
      setTimeout(updateProgress, nextUpdateTime);
    } else {
      callback({
        status: 'complete',
        progress: 100,
        currentStep: "Generation complete!"
      });
      
      setTimeout(complete, 1000);
    }
  };
  
  // Start the simulation after a short delay
  setTimeout(updateProgress, 800);
  
  // Return cancel function
  return () => {
    cancelled = true;
  };
}