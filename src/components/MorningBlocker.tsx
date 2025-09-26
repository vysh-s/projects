import React, { useState } from 'react';
import { Sun, Coffee, Sparkles, X, Clock, Target, Zap } from 'lucide-react';

interface MorningBlockerProps {
  onDismiss: (action: 'bypass' | 'quickAction' | 'surprise') => void;
  messageStyle: 'sassy' | 'chill' | 'meme';
}

export function MorningBlocker({ onDismiss, messageStyle }: MorningBlockerProps) {
  const [selectedTask, setSelectedTask] = useState<string>('');
  const [showTaskSelection, setShowTaskSelection] = useState(false);

  const messages = {
    sassy: [
      "Scrolling already? Go touch grass! 🌱",
      "Brainrot at 7 AM? Brush those teeth! 🦷",
      "The sun just came up and you're doom-scrolling? Really? ☀️",
      "Morning person or morning doom-scroller? Choose wisely! 😏"
    ],
    chill: [
      "Good morning! Maybe start with something peaceful? 🌅",
      "Hey there, early bird! How about we ease into the day? ☕",
      "Morning vibes check - ready for something mindful? 🧘",
      "The day is fresh - let's keep that energy clean! ✨"
    ],
    meme: [
      "POV: You woke up and chose chaos 💀",
      "Morning brainrot speedrun any% 🏃‍♂️",
      "Tell me you're addicted without telling me... 📱",
      "When the algorithm knows you better than your alarm clock 🤖"
    ]
  };

  const quickTasks = [
    { id: 'water', emoji: '💧', title: 'Drink water', desc: '30 seconds', points: 25 },
    { id: 'stretch', emoji: '🤸', title: 'Morning stretch', desc: '1 minute', points: 50 },
    { id: 'breathe', emoji: '🧘', title: 'Deep breaths', desc: '30 seconds', points: 25 },
    { id: 'todo', emoji: '✅', title: 'Write one todo', desc: '1 minute', points: 50 },
    { id: 'gratitude', emoji: '🙏', title: 'Gratitude moment', desc: '30 seconds', points: 25 },
    { id: 'plan', emoji: '📋', title: 'Plan your day', desc: '2 minutes', points: 75 }
  ];

  const surpriseOptions = [
    { id: 'quote', emoji: '💭', title: 'Inspiring Quote', desc: 'Daily wisdom' },
    { id: 'meme', emoji: '😂', title: 'Wholesome Meme', desc: 'Start with a smile' },
    { id: 'game', emoji: '🎮', title: 'Mini Brain Game', desc: '2-minute challenge' },
    { id: 'fact', emoji: '🤓', title: 'Cool Fact', desc: 'Learn something new' }
  ];

  const currentMessage = messages[messageStyle][Math.floor(Math.random() * messages[messageStyle].length)];

  const handleQuickAction = () => {
    if (!selectedTask) {
      setShowTaskSelection(true);
      return;
    }
    onDismiss('quickAction');
  };

  const handleSurprise = () => {
    onDismiss('surprise');
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-600 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-36 h-36 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-white/20 animate-bounce-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -translate-y-12 translate-x-12"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Sun className="w-8 h-8 animate-spin-slow" />
                <h2 className="text-xl font-black">Morning Vibe Check! ☀️</h2>
              </div>
              <div className="text-sm bg-white/20 px-3 py-1 rounded-full font-bold">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <p className="text-lg font-bold text-white/95">{currentMessage}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {showTaskSelection && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-500" />
                Pick your morning win! 🎯
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {quickTasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => setSelectedTask(task.id)}
                    className={`p-4 rounded-2xl text-center transition-all transform hover:scale-105 ${
                      selectedTask === task.id
                        ? 'bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-purple-500 shadow-lg'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:shadow-md'
                    }`}
                  >
                    <div className="text-2xl mb-2">{task.emoji}</div>
                    <div className="text-sm font-bold text-gray-800">{task.title}</div>
                    <div className="text-xs text-gray-600">{task.desc}</div>
                    <div className="text-xs text-purple-600 font-bold mt-1">+{task.points} pts</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!showTaskSelection && (
            <div className="space-y-4">
              {/* Stats */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
                <div className="text-center">
                  <div className="text-2xl font-black text-purple-600 mb-1">Day 7</div>
                  <div className="text-sm text-gray-600 font-medium">Morning streak 🔥</div>
                  <div className="text-xs text-gray-500 mt-2">Keep it going for the "Morning Hero" badge!</div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-3 border border-green-100">
                <div className="text-center text-sm">
                  <div className="font-bold text-green-600">🌅 1,247 users started mindfully today!</div>
                  <div className="text-gray-600 text-xs">Join the morning winners</div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleQuickAction}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all font-bold text-lg transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>{showTaskSelection && selectedTask ? 'Let\'s do this!' : 'Quick Action'} ⚡</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleSurprise}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all font-bold transform hover:scale-105 shadow-md flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Surprise Me! 🎲</span>
              </button>

              <button
                onClick={() => onDismiss('bypass')}
                className="bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all font-medium"
              >
                Let me scroll 📱
              </button>
            </div>
          </div>

          {/* Soft Start Notice */}
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
            <div className="text-center text-xs text-blue-700">
              <Coffee className="w-4 h-4 inline mr-1" />
              <strong>Soft start mode:</strong> Just suggestions this week! No blocking yet ☕
            </div>
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
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(50px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(-10px);
          }
          70% {
            transform: scale(0.9) translateY(0px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0px);
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}