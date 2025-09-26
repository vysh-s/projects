import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Onboarding } from './components/Onboarding';
import { InterventionOverlay } from './components/InterventionOverlay';
import { MorningBlocker } from './components/MorningBlocker';
import { ThemeProvider } from './components/ThemeProvider';
import { useSessionTracking } from './hooks/useSessionTracking';
import { useInterventionSystem } from './hooks/useInterventionSystem';
import { useMorningBlocker } from './hooks/useMorningBlocker';

function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'settings'>('dashboard');
  const [currentTheme, setCurrentTheme] = useState('neon');
  
  const { sessionTime, isActive, brainrotPercentage } = useSessionTracking();
  const { 
    currentIntervention, 
    dismissIntervention, 
    snoozeIntervention,
    userPoints,
    streak 
  } = useInterventionSystem(sessionTime, brainrotPercentage);

  const {
    showMorningBlocker,
    morningSettings,
    morningStreak,
    handleMorningAction
  } = useMorningBlocker();

  useEffect(() => {
    const onboarded = localStorage.getItem('brainrot-buster-onboarded');
    const theme = localStorage.getItem('brainrot-buster-theme') || 'neon';
    setIsOnboarded(!!onboarded);
    setCurrentTheme(theme);
  }, []);

  const handleOnboardingComplete = () => {
    setIsOnboarded(true);
    localStorage.setItem('brainrot-buster-onboarded', 'true');
  };

  // Show morning blocker first if needed
  if (showMorningBlocker && isOnboarded) {
    return (
      <ThemeProvider theme={currentTheme}>
        <MorningBlocker
          onDismiss={handleMorningAction}
          messageStyle={morningSettings.messageStyle}
        />
      </ThemeProvider>
    );
  }

  if (!isOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
                <span className="text-white font-bold text-xl">🧠</span>
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-800">Brainrot Buster</h1>
                <p className="text-sm text-gray-600 font-medium">Your AI sidekick for mindful scrolling ✨</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-bold text-pink-600">🔥 {userPoints} points</div>
                <div className="text-xs text-gray-500 font-medium">⚡ {streak} day streak</div>
              </div>
              <nav className="flex space-x-2">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-4 py-2 rounded-xl transition-all font-medium ${
                    currentView === 'dashboard' 
                      ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 shadow-sm' 
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('settings')}
                  className={`px-4 py-2 rounded-xl transition-all font-medium ${
                    currentView === 'settings' 
                      ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 shadow-sm' 
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  Settings
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Dashboard 
          currentView={currentView}
          sessionTime={sessionTime}
          isActive={isActive}
          brainrotPercentage={brainrotPercentage}
          userPoints={userPoints}
          streak={streak}
        />
      </main>

      {/* Intervention Overlay */}
      {currentIntervention && (
        <InterventionOverlay
          intervention={currentIntervention}
          onDismiss={(engaged, helpful) => dismissIntervention(engaged, helpful)}
          onSnooze={snoozeIntervention}
        />
      )}
      </div>
    </ThemeProvider>
  );
}

export default App;