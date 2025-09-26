import { useState, useEffect } from 'react';

interface MorningSettings {
  enabled: boolean;
  startTime: string;
  endTime: string;
  messageStyle: 'sassy' | 'chill' | 'meme';
  softStartMode: boolean;
}

export function useMorningBlocker() {
  const [showMorningBlocker, setShowMorningBlocker] = useState(false);
  const [morningSettings, setMorningSettings] = useState<MorningSettings>({
    enabled: true,
    startTime: '06:00',
    endTime: '09:00',
    messageStyle: 'sassy',
    softStartMode: true
  });
  const [morningStreak, setMorningStreak] = useState(7);
  const [lastMorningAction, setLastMorningAction] = useState<string | null>(null);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('brainrot-buster-morning-settings');
    if (savedSettings) {
      setMorningSettings(JSON.parse(savedSettings));
    }

    const savedStreak = localStorage.getItem('brainrot-buster-morning-streak');
    if (savedStreak) {
      setMorningStreak(parseInt(savedStreak));
    }

    // Check if we should show morning blocker
    checkMorningBlocker();
  }, []);

  const checkMorningBlocker = () => {
    if (!morningSettings.enabled) return;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const [startHour, startMin] = morningSettings.startTime.split(':').map(Number);
    const [endHour, endMin] = morningSettings.endTime.split(':').map(Number);
    
    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;

    const isInMorningWindow = currentTime >= startTime && currentTime <= endTime;
    const today = now.toDateString();
    const lastActionDate = localStorage.getItem('brainrot-buster-last-morning-action-date');

    // Show blocker if in morning window and haven't acted today
    if (isInMorningWindow && lastActionDate !== today) {
      setShowMorningBlocker(true);
    }
  };

  const handleMorningAction = (action: 'bypass' | 'quickAction' | 'surprise') => {
    const today = new Date().toDateString();
    localStorage.setItem('brainrot-buster-last-morning-action-date', today);
    setLastMorningAction(action);
    setShowMorningBlocker(false);

    // Update streak based on action
    if (action === 'quickAction' || action === 'surprise') {
      const newStreak = morningStreak + 1;
      setMorningStreak(newStreak);
      localStorage.setItem('brainrot-buster-morning-streak', newStreak.toString());
    }

    // Track morning action for analytics
    const morningStats = JSON.parse(localStorage.getItem('brainrot-buster-morning-stats') || '{}');
    morningStats[today] = action;
    localStorage.setItem('brainrot-buster-morning-stats', JSON.stringify(morningStats));
  };

  const updateMorningSettings = (newSettings: Partial<MorningSettings>) => {
    const updated = { ...morningSettings, ...newSettings };
    setMorningSettings(updated);
    localStorage.setItem('brainrot-buster-morning-settings', JSON.stringify(updated));
  };

  return {
    showMorningBlocker,
    morningSettings,
    morningStreak,
    lastMorningAction,
    handleMorningAction,
    updateMorningSettings,
    checkMorningBlocker
  };
}