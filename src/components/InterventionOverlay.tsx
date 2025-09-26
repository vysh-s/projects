import React, { useState } from 'react';
import { X, Clock, Mail, BookOpen, Zap, Sparkles, Coffee, Target } from 'lucide-react';

interface Intervention {
  type: 'nudge' | 'email' | 'reading' | 'challenge';
  title: string;
  message: string;
  action?: string;
  severity: 'low' | 'medium' | 'high';
}

interface InterventionOverlayProps {
  intervention: Intervention;
  onDismiss: (engaged: boolean, helpful?: boolean) => void;
  onSnooze: () => void;
}

export function InterventionOverlay({ intervention, onDismiss, onSnooze }: InterventionOverlayProps) {
  const [mood, setMood] = useState<string>('');
  const [showMoodCheck, setShowMoodCheck] = useState(intervention.severity === 'high');
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string>('');

  const getIcon = () => {
    switch (intervention.type) {
      case 'nudge': return <Sparkles className="w-6 h-6" />;
      case 'email': return <Mail className="w-6 h-6" />;
      case 'reading': return <BookOpen className="w-6 h-6" />;
      case 'challenge': return <Zap className="w-6 h-6" />;
    }
  };

  const getBackgroundGradient = () => {
    switch (intervention.severity) {
      case 'low': return 'from-pink-500 to-purple-500';
      case 'medium': return 'from-purple-500 to-blue-500';
      case 'high': return 'from-blue-500 to-indigo-600';
    }
  };

  const quickTasks = [
    { id: 'water', emoji: '💧', title: 'Drink water', desc: '30 seconds', points: 25 },
    { id: 'stretch', emoji: '🤸', title: 'Quick stretch', desc: '1 minute', points: 50 },
    { id: 'breathe', emoji: '🧘', title: 'Deep breaths', desc: '30 seconds', points: 25 },
    { id: 'todo', emoji: '✅', title: 'Check one todo', desc: '2 minutes', points: 75 },
    { id: 'text', emoji: '💬', title: 'Text someone', desc: '1 minute', points: 50 },
    { id: 'walk', emoji: '🚶', title: 'Mini walk', desc: '3 minutes', points: 100 }
  ];

  const handleEngage = () => {
    if (showMoodCheck && !mood) return;
    if (intervention.type === 'challenge' && !selectedTask) return;
    
    setShowFeedback(true);
  };

  const handleFeedback = (helpful: boolean) => {
    onDismiss(true, helpful);
  };

  const moods = [
    { emoji: '🔥', label: 'Pumped', value: 'pumped' },
    { emoji: '😊', label: 'Good', value: 'good' },
    { emoji: '😐', label: 'Meh', value: 'meh' },
    { emoji: '😴', label: 'Tired', value: 'tired' }
  ];

  const wittyMessages = [
    "Brainrot overload detected! 🚨 Time for a quick win!",
    "Your brain called - it wants some quality content! 📞",
    "Plot twist: Let's do something awesome instead! 🎬",
    "Scrolling level: Expert. Achievement level: Let's boost it! 🚀"
  ];

  if (showFeedback) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        <div className="relative bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
          <div className={`bg-gradient-to-r ${getBackgroundGradient()} p-6 text-white text-center`}>
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-lg font-bold">Nice work!</h3>
            <p className="text-white/90">You just leveled up your day</p>
          </div>

          <div className="p-6 text-center">
            <p className="text-gray-700 mb-6">Was this helpful?</p>
            <div className="flex space-x-3">
              <button
                onClick={() => handleFeedback(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all font-medium"
              >
                Not really
              </button>
              <button
                onClick={() => handleFeedback(true)}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all font-medium"
              >
                Totally! 🙌
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      <div className="relative bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-bounce-in">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getBackgroundGradient()} p-6 text-white relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getIcon()}
                <h3 className="text-lg font-bold">{intervention.title}</h3>
              </div>
              <button
                onClick={() => onDismiss(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-white/90 font-medium">
              {wittyMessages[Math.floor(Math.random() * wittyMessages.length)]}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {showMoodCheck && (
            <div>
              <h4 className="text-sm font-bold text-gray-700 mb-3">Quick vibe check! How you feeling? 🎯</h4>
              <div className="grid grid-cols-2 gap-2">
                {moods.map((moodOption) => (
                  <button
                    key={moodOption.value}
                    onClick={() => setMood(moodOption.value)}
                    className={`p-3 rounded-xl text-center transition-all transform hover:scale-105 ${
                      mood === moodOption.value
                        ? 'bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-purple-500 shadow-lg'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-2xl mb-1">{moodOption.emoji}</div>
                    <div className="text-xs font-bold">{moodOption.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {intervention.type === 'email' && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-purple-100">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Your inbox is calling! 📧
              </h4>
              <div className="space-y-2 text-sm">
                <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="font-medium text-gray-800">Project Update from Sarah</div>
                  <div className="text-gray-600 text-xs">2 hours ago • Might be important!</div>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="font-medium text-gray-800">Meeting Reminder</div>
                  <div className="text-gray-600 text-xs">1 hour ago • Don't miss it!</div>
                </div>
              </div>
            </div>
          )}

          {intervention.type === 'reading' && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 border border-blue-100">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Level up your brain! 🧠
              </h4>
              <div className="space-y-2 text-sm">
                <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="font-medium text-gray-800">The Future of AI in Design</div>
                  <div className="text-gray-600 text-xs">5 min read • UX Planet • 🔥 Trending</div>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="font-medium text-gray-800">Building Better Habits</div>
                  <div className="text-gray-600 text-xs">8 min read • Harvard Business Review • ⭐ Top pick</div>
                </div>
              </div>
            </div>
          )}

          {intervention.type === 'challenge' && (
            <div className="bg-gradient-to-r from-yellow-50 to-pink-50 rounded-2xl p-4 border border-pink-100">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Surprise me! Pick a quick win 🎲
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {quickTasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => setSelectedTask(task.id)}
                    className={`p-3 rounded-xl text-center transition-all transform hover:scale-105 ${
                      selectedTask === task.id
                        ? 'bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-purple-500 shadow-lg'
                        : 'bg-white border-2 border-transparent hover:shadow-md'
                    }`}
                  >
                    <div className="text-xl mb-1">{task.emoji}</div>
                    <div className="text-xs font-bold text-gray-800">{task.title}</div>
                    <div className="text-xs text-gray-600">{task.desc}</div>
                    <div className="text-xs text-purple-600 font-bold">+{task.points} pts</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Social Proof */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
            <div className="text-center text-sm">
              <div className="font-bold text-purple-600">🎉 2,847 users beat brainrot today!</div>
              <div className="text-gray-600 text-xs">Join the productivity party</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onSnooze}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all font-medium"
            >
              Snooze 10m
            </button>
            <button
              onClick={() => onDismiss(false)}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all font-medium"
            >
              Nah
            </button>
            <button
              onClick={handleEngage}
              disabled={(showMoodCheck && !mood) || (intervention.type === 'challenge' && !selectedTask)}
              className="flex-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              Jump to Action! 🚀
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
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