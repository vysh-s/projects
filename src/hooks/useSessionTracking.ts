import { useState, useEffect } from 'react';

interface SessionData {
  sessionTime: number;
  isActive: boolean;
  brainrotPercentage: number;
  contentAnalyzed: number;
  brainrotCount: number;
}

export function useSessionTracking() {
  const [sessionData, setSessionData] = useState<SessionData>({
    sessionTime: 0,
    isActive: false,
    brainrotPercentage: 0,
    contentAnalyzed: 0,
    brainrotCount: 0
  });

  useEffect(() => {
    // Simulate session tracking
    const interval = setInterval(() => {
      setSessionData(prev => {
        // Simulate content analysis
        const shouldAnalyze = Math.random() < 0.3; // 30% chance of new content
        let newContentAnalyzed = prev.contentAnalyzed;
        let newBrainrotCount = prev.brainrotCount;
        
        if (shouldAnalyze && prev.sessionTime > 0) {
          newContentAnalyzed++;
          // Simulate brainrot detection (higher chance as session gets longer)
          const brainrotChance = Math.min(0.8, 0.3 + (prev.sessionTime * 0.02));
          if (Math.random() < brainrotChance) {
            newBrainrotCount++;
          }
        }

        const newBrainrotPercentage = newContentAnalyzed > 0 
          ? Math.round((newBrainrotCount / newContentAnalyzed) * 100)
          : 0;

        return {
          sessionTime: prev.sessionTime + 1,
          isActive: true,
          brainrotPercentage: newBrainrotPercentage,
          contentAnalyzed: newContentAnalyzed,
          brainrotCount: newBrainrotCount
        };
      });
    }, 60000); // Update every minute for demo (in real app, would be more frequent)

    // For demo, start with some activity
    setTimeout(() => {
      setSessionData(prev => ({
        ...prev,
        sessionTime: 12,
        contentAnalyzed: 8,
        brainrotCount: 6,
        brainrotPercentage: 75
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return sessionData;
}