import React, { useState } from 'react';
import { ChevronRight, Zap, Play, Sparkles } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0); // Start with splash screen
  const [selectedVibe, setSelectedVibe] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);

  const vibeOptions = [
    { id: 'memes', emoji: '😂', title: 'Meme Lord', desc: 'Love the laughs but want balance' },
    { id: 'fitness', emoji: '💪', title: 'Fitness Freak', desc: 'Health content over mindless scrolls' },
    { id: 'tech', emoji: '🚀', title: 'Tech Geek', desc: 'Innovation over drama' },
    { id: 'creative', emoji: '🎨', title: 'Creative Soul', desc: 'Art and inspiration over chaos' },
    { id: 'business', emoji: '💼', title: 'Hustle Mode', desc: 'Growth content over time waste' },
    { id: 'chill', emoji: '🌊', title: 'Zen Vibes', desc: 'Mindful content over noise' }
  ];

  const goalsByVibe = {
    memes: ['Keep the fun, lose the doom', 'Quality memes only', 'Laugh breaks, not scroll traps'],
    fitness: ['Health content first', 'Workout motivation', 'Wellness over drama'],
    tech: ['Latest innovations', 'Learning opportunities', 'Future-focused content'],
    creative: ['Artistic inspiration', 'Creative tutorials', 'Design trends'],
    business: ['Growth mindset content', 'Productivity tips', 'Success stories'],
    chill: ['Mindful moments', 'Peaceful content', 'Stress-free scrolling']
  };

  const platformOptions = [
    { name: 'Twitter/X', icon: '𝕏', gradient: 'from-black to-gray-800' },
    { name: 'Instagram', icon: '📷', gradient: 'from-pink-500 to-purple-500' },
    { name: 'TikTok', icon: '🎵', gradient: 'from-red-500 to-pink-500' },
    { name: 'Reddit', icon: '🤖', gradient: 'from-orange-500 to-red-500' },
    { name: 'YouTube', icon: '▶️', gradient: 'from-red-600 to-red-500' },
    { name: 'LinkedIn', icon: '💼', gradient: 'from-blue-600 to-blue-500' }
  ];

  const handleComplete = () => {
    localStorage.setItem('brainrot-buster-vibe', selectedVibe);
    localStorage.setItem('brainrot-buster-goals', JSON.stringify(goals));
    localStorage.setItem('brainrot-buster-platforms', JSON.stringify(platforms));
    onComplete();
  };

  // Splash Screen
  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-blue-600 flex items-center justify-center p-6 overflow-hidden relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-20 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 text-center max-w-2xl">
          <div className="mb-8 animate-bounce">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-3xl mx-auto mb-6 flex items-center justify-center text-4xl shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
              🧠
            </div>
          </div>
          
          <h1 className="text-6xl font-black text-white mb-4 tracking-tight">
            Brainrot
            <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent"> Buster</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 font-medium">
            Your AI sidekick that turns mindless scrolling into mindful wins! 🚀
          </p>
          
          {/* TikTok-style explainer preview */}
          <div className="mb-8 flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 max-w-sm">
              <div className="aspect-video bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-center text-white">
                  <div className="text-2xl mb-2">🧠⚡</div>
                  <div className="text-sm font-bold">15-sec Demo</div>
                  <div className="text-xs opacity-80">Morning blocker + Smart nudges</div>
                </div>
                <div className="absolute bottom-2 right-2 bg-white/20 rounded-full p-1">
                  <Play className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="text-white/80 text-sm text-center">
                See how we turn doom-scrolling into wins! 🎯
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setStep(1)}
              className="group bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3 mx-auto"
            >
              <Sparkles className="w-6 h-6 group-hover:animate-spin" />
              <span>Let's Vibe Check! ✨</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex items-center justify-center space-x-4 text-white/70 text-sm">
              <div className="flex items-center space-x-1">
                <Play className="w-4 h-4" />
                <span>15-sec setup</span>
              </div>
              <div>•</div>
              <div>No email required</div>
              <div>•</div>
              <div>Always skippable</div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          .animation-delay-200 {
            animation-delay: 0.2s;
          }
          .animation-delay-400 {
            animation-delay: 0.4s;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-blue-600 flex items-center justify-center p-6">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-white/20">
        
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <Zap className="w-12 h-12 text-purple-500 mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">What's Your Vibe? 🎯</h2>
              <p className="text-gray-600 mb-6">Pick the energy that matches your goals</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vibeOptions.map((vibe) => (
                <button
                  key={vibe.id}
                  onClick={() => {
                    setSelectedVibe(vibe.id);
                    setGoals(goalsByVibe[vibe.id as keyof typeof goalsByVibe]);
                  }}
                  className={`p-6 rounded-2xl text-left transition-all transform hover:scale-105 ${
                    selectedVibe === vibe.id
                      ? 'bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-purple-500 shadow-lg'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:shadow-md'
                  }`}
                >
                  <div className="text-3xl mb-2">{vibe.emoji}</div>
                  <div className="font-bold text-gray-800 mb-1">{vibe.title}</div>
                  <div className="text-sm text-gray-600">{vibe.desc}</div>
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setStep(2)}
              disabled={!selectedVibe}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-bold transform hover:scale-105"
            >
              <span>Lock in my vibe! 🔥</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Where do you scroll?</h2>
              <p className="text-gray-600 mb-6">We'll keep watch on these platforms</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {platformOptions.map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => {
                    setPlatforms(prev => 
                      prev.includes(platform.name) 
                        ? prev.filter(p => p !== platform.name)
                        : [...prev, platform.name]
                    );
                  }}
                  className={`p-4 rounded-2xl text-center transition-all transform hover:scale-105 ${
                    platforms.includes(platform.name)
                      ? 'bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-purple-500 shadow-lg'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:shadow-md'
                  }`}
                >
                  <div className="text-2xl mb-2">{platform.icon}</div>
                  <div className="text-sm font-bold text-gray-800">{platform.name}</div>
                </button>
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl hover:bg-gray-200 transition-all font-medium"
              >
                Back
              </button>
              <button
                onClick={handleComplete}
                disabled={platforms.length === 0}
                className="flex-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-6 rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-bold transform hover:scale-105"
              >
                <span>Start the magic! ✨</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Progress indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i <= step ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}