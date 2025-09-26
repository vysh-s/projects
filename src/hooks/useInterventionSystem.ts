import { useState, useEffect } from 'react';

interface Intervention {
  type: 'nudge' | 'email' | 'reading' | 'challenge';
  title: string;
  message: string;
  action?: string;
  severity: 'low' | 'medium' | 'high';
}

export function useInterventionSystem(sessionTime: number, brainrotPercentage: number) {
  const [currentIntervention, setCurrentIntervention] = useState<Intervention | null>(null);
  const [userPoints, setUserPoints] = useState(1250);
  const [streak, setStreak] = useState(7);
  const [interventionCount, setInterventionCount] = useState(0);
  const [helpfulFeedback, setHelpfulFeedback] = useState(0);

  const interventions: Intervention[] = [
    {
      type: 'nudge',
      title: 'Vibe Check! ✨',
      message: 'Your brain called - it wants some quality content! 📞',
      severity: 'low'
    },
    {
      type: 'email',
      title: 'Inbox Alert! 📧',
      message: 'Plot twist: Your emails might be more interesting than this feed!',
      action: 'Jump to Gmail',
      severity: 'medium'
    },
    {
      type: 'reading',
      title: 'Level Up Time! 🧠',
      message: 'Ready to feed your brain some premium content?',
      action: 'Let\'s Read',
      severity: 'medium'
    },
    {
      type: 'challenge',
      title: 'Quick Win Challenge! 🎯',
      message: 'Time for a dopamine hit from actually accomplishing something!',
      action: 'Surprise Me',
      severity: 'high'
    }
  ];

  useEffect(() => {
    // Trigger interventions based on session time and brainrot percentage
    const shouldTrigger = sessionTime > 10 && 
                          brainrotPercentage > 70 && 
                          !currentIntervention &&
                          Math.random() < 0.3; // 30% chance every check

    if (shouldTrigger) {
      let interventionType: Intervention;
      
      if (sessionTime < 20) {
        interventionType = interventions[0]; // Nudge
      } else if (sessionTime < 30) {
        interventionType = interventions[Math.floor(Math.random() * 2) + 1]; // Email or Reading
      } else {
        interventionType = interventions[Math.floor(Math.random() * 2) + 2]; // Reading or Challenge
      }
      
      setCurrentIntervention(interventionType);
    }
  }, [sessionTime, brainrotPercentage, currentIntervention]);

  const dismissIntervention = (engaged: boolean, helpful?: boolean) => {
    if (engaged) {
      // Award points for engagement
      const points = currentIntervention?.severity === 'high' ? 100 : 
                    currentIntervention?.severity === 'medium' ? 50 : 25;
      setUserPoints(prev => prev + points);
      
      // Increase intervention count
      setInterventionCount(prev => prev + 1);
      
      // Track helpful feedback
      if (helpful) {
        setHelpfulFeedback(prev => prev + 1);
      }
      
      // Chance to increase streak
      if (Math.random() < 0.3) {
        setStreak(prev => prev + 1);
      }
    }
    
    setCurrentIntervention(null);
  };

  const snoozeIntervention = () => {
    setCurrentIntervention(null);
    // Re-trigger after delay (simplified for demo)
    setTimeout(() => {
      if (Math.random() < 0.5) {
        setCurrentIntervention(interventions[0]);
      }
    }, 10000);
  };

  return {
    currentIntervention,
    dismissIntervention,
    snoozeIntervention,
    userPoints,
    streak,
    interventionCount,
    helpfulFeedback
  };
}