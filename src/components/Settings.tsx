import React, { useState } from 'react';
import { Settings as SettingsIcon, Clock, Target, Palette, Shield, Sparkles, Zap, Sun, Coffee } from 'lucide-react';

export function Settings() {
  const [detectionThreshold, setDetectionThreshold] = useState(10);
  const [brainrotThreshold, setBrainrotThreshold] = useState(70);
  const [interventionFrequency, setInterventionFrequency] = useState('balanced');
  const [grayscaleMode, setGrayscaleMode] = useState(false);
  const [theme, setTheme] = useState('default');
  const [userPoints] = useState(1250);
  const [morningBlockerEnabled, setMorningBlockerEnabled] = useState(true);
  const [morningStartTime, setMorningStartTime] = useState('06:00');
  const [morningEndTime, setMorningEndTime] = useState('09:00');
  const [morningMessageStyle, setMorningMessageStyle] = useState('sassy');
  const [idleThreshold, setIdleThreshold] = useState(4);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Detection Settings */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-pink-100 shadow-lg hover:shadow-xl transition-all">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl">
            <Clock className="w-6 h-6 text-purple-500" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Detection Settings</h2>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detection Threshold: {detectionThreshold} minutes
            </label>
            <input
              type="range"
              min="5"
              max="30"
              value={detectionThreshold}
              onChange={(e) => setDetectionThreshold(Number(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full appearance-none cursor-pointer"
            />
            <p className="text-xs text-gray-600 mt-2 font-medium">
              Start monitoring after this many minutes of scrolling
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brainrot Threshold: {brainrotThreshold}%
            </label>
            <input
              type="range"
              min="50"
              max="90"
              value={brainrotThreshold}
              onChange={(e) => setBrainrotThreshold(Number(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full appearance-none cursor-pointer"
            />
            <p className="text-xs text-gray-600 mt-2 font-medium">
              Trigger interventions when this % of content is classified as brainrot
            </p>
          </div>
        </div>
      </div>

      {/* Intervention Settings */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-pink-100 shadow-lg hover:shadow-xl transition-all">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
            <Target className="w-6 h-6 text-blue-500" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Intervention Settings</h2>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Intervention Frequency
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['gentle', 'balanced', 'aggressive'].map((freq) => (
                <button
                  key={freq}
                  onClick={() => setInterventionFrequency(freq)}
                  className={`p-4 rounded-2xl text-center transition-all capitalize font-bold transform hover:scale-105 ${
                    interventionFrequency === freq
                      ? 'bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-purple-500 text-purple-700 shadow-lg'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:shadow-md'
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-800">Mindfulness Mode</div>
              <div className="text-sm text-gray-600 font-medium">Enable grayscale during interventions</div>
            </div>
            <button
              onClick={() => setGrayscaleMode(!grayscaleMode)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all shadow-inner ${
                grayscaleMode ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${
                  grayscaleMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Morning Blocker Settings */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-pink-100 shadow-lg hover:shadow-xl transition-all">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl">
            <Sun className="w-6 h-6 text-yellow-500" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Auto Morning Blocker ☀️</h2>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-800">Auto-Trigger After Sleep</div>
              <div className="text-sm text-gray-600 font-medium">Detect long inactivity and trigger on first social app open</div>
            </div>
            <button
              onClick={() => setMorningBlockerEnabled(!morningBlockerEnabled)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all shadow-inner ${
                morningBlockerEnabled ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${
                  morningBlockerEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sleep Detection: {idleThreshold} hours of inactivity
            </label>
            <input
              type="range"
              min="2"
              max="8"
              value={idleThreshold}
              onChange={(e) => setIdleThreshold(Number(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full appearance-none cursor-pointer"
            />
            <p className="text-xs text-gray-600 mt-2 font-medium">
              Trigger morning blocker after this much device inactivity (proxy for sleep)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-700 mb-1">🤖 Smart Detection</div>
                  <div className="text-sm text-gray-700 font-medium">
                    Uses Chrome idle API to detect when you've been away from your device (sleeping, working, etc.)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Message Vibe 🎭
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'sassy', emoji: '😏', label: 'Sassy', desc: 'Playful roasts' },
                { id: 'chill', emoji: '😌', label: 'Chill', desc: 'Gentle nudges' },
                { id: 'meme', emoji: '💀', label: 'Meme Lord', desc: 'Internet humor' }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setMorningMessageStyle(style.id)}
                  className={`p-4 rounded-2xl text-center transition-all transform hover:scale-105 ${
                    morningMessageStyle === style.id
                      ? 'bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-purple-500 text-purple-700 shadow-lg'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:shadow-md'
                  }`}
                >
                  <div className="text-2xl mb-1">{style.emoji}</div>
                  <div className="font-bold text-sm">{style.label}</div>
                  <div className="text-xs text-gray-600">{style.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
            <div className="flex items-center space-x-2 mb-2">
              <Coffee className="w-5 h-5 text-blue-500" />
              <div className="font-bold text-blue-700">Soft Start Mode Active</div>
            </div>
            <div className="text-sm text-gray-700 font-medium">
              First week is suggestions only - no blocking! We'll ease you into it ☕
            </div>
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-pink-100 shadow-lg hover:shadow-xl transition-all">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl">
            <Palette className="w-6 h-6 text-green-500" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Vibe Packs ✨</h2>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">
            Unlock new vibes with your points! 🎨
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { name: 'neon', label: 'Neon Dreams', emoji: '💖', unlocked: true, gradient: 'from-pink-400 to-purple-500' },
              { name: 'cyberpunk', label: 'Cyberpunk', emoji: '🤖', unlocked: userPoints >= 500, cost: 500, gradient: 'from-cyan-400 to-purple-500' },
              { name: 'retro', label: 'Retro Arcade', emoji: '🕹️', unlocked: userPoints >= 1000, cost: 1000, gradient: 'from-yellow-400 to-orange-500' },
              { name: 'cosmic', label: 'Cosmic Chill', emoji: '🌌', unlocked: userPoints >= 1500, cost: 1500, gradient: 'from-indigo-500 to-purple-600' }
            ].map((themeOption) => (
              <button
                key={themeOption.name}
                onClick={() => themeOption.unlocked && setTheme(themeOption.name)}
                disabled={!themeOption.unlocked}
                className={`p-4 rounded-2xl text-center transition-all transform hover:scale-105 relative overflow-hidden ${
                  theme === themeOption.name
                    ? 'border-2 border-purple-500 shadow-lg'
                    : themeOption.unlocked
                    ? 'border-2 border-transparent hover:shadow-md'
                    : 'border-2 border-gray-200 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${themeOption.gradient} opacity-20`}></div>
                <div className="relative z-10">
                  <div className="text-2xl mb-1">{themeOption.emoji}</div>
                  <div className="font-bold text-gray-800">{themeOption.label}</div>
                  {themeOption.unlocked && theme === themeOption.name && (
                    <div className="text-xs text-purple-600 font-bold mt-1">✓ Active</div>
                  )}
                </div>
                {!themeOption.unlocked && (
                  <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {themeOption.cost} pts
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-pink-100 shadow-lg hover:shadow-xl transition-all">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl">
            <Shield className="w-6 h-6 text-orange-500" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Privacy & Permissions</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-800">Local Processing</div>
              <div className="text-sm text-gray-600 font-medium">All content analysis happens on your device</div>
            </div>
            <div className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">✓ Enabled</div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-800">Idle Detection Permission</div>
              <div className="text-sm text-gray-600 font-medium">Required for auto morning blocker (detects device sleep/wake)</div>
            </div>
            <div className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">✓ Granted</div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <div className="font-bold text-purple-700">🔒 Privacy First</div>
            </div>
            <div className="text-sm text-gray-700 font-medium">
              All content analysis happens on your device. Idle detection only tracks activity state, not what you're doing. Your scrolling habits stay private! 🛡️
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}