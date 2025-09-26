import React from 'react';
import { StatsCard } from './StatsCard';
import { ActivityChart } from './ActivityChart';
import { Settings } from './Settings';
import { Clock, TrendingUp, Target, Zap } from 'lucide-react';

interface DashboardProps {
  currentView: 'dashboard' | 'settings';
  sessionTime: number;
  isActive: boolean;
  brainrotPercentage: number;
  userPoints: number;
  streak: number;
}

export function Dashboard({ 
  currentView, 
  sessionTime, 
  isActive, 
  brainrotPercentage,
  userPoints,
  streak 
}: DashboardProps) {
  if (currentView === 'settings') {
    return <Settings />;
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="space-y-8">
      {/* Current Session Status */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-pink-100 shadow-lg hover:shadow-xl transition-all">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Current Session 🎯</h2>
          <div className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
            isActive ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' : 'bg-gray-100 text-gray-600'
          }`}>
            {isActive ? '🟢 Active' : '⚫ Inactive'}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">{formatTime(sessionTime)}</div>
            <div className="text-sm text-gray-600 font-medium">Session Time</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">{brainrotPercentage}%</div>
            <div className="text-sm text-gray-600 font-medium">Brainrot Detected</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">{sessionTime > 10 ? '🔥 ON' : '💤 OFF'}</div>
            <div className="text-sm text-gray-600 font-medium">AI Detection</div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={<Clock className="w-6 h-6 text-purple-500" />}
          title="Daily Average"
          value="2h 15m"
          change="-12% vs yesterday"
          positive={true}
        />
        <StatsCard
          icon={<TrendingUp className="w-6 h-6 text-blue-500" />}
          title="Interventions"
          value="8"
          change="3 engaged today"
          positive={true}
        />
        <StatsCard
          icon={<Target className="w-6 h-6 text-green-500" />}
          title="Focus Score"
          value="7.2/10"
          change="+0.8 this week"
          positive={true}
        />
        <StatsCard
          icon={<Zap className="w-6 h-6 text-orange-500" />}
          title="Total Points"
          value={userPoints.toLocaleString()}
          change={`${streak} day streak`}
          positive={true}
        />
      </div>

      {/* Activity Chart */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-pink-100 shadow-lg hover:shadow-xl transition-all">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Weekly Brainrot Levels 📊</h3>
        <ActivityChart />
      </div>

      {/* Quick Actions */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-pink-100 shadow-lg hover:shadow-xl transition-all">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions ⚡</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg">
            <div className="text-sm font-bold">🧪 Test Intervention</div>
            <div className="text-xs opacity-90 mt-1">See the magic in action</div>
          </button>
          <button className="p-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg">
            <div className="text-sm font-bold">☀️ Test Morning Block</div>
            <div className="text-xs opacity-90 mt-1">Preview morning popup</div>
          </button>
          <button className="p-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg">
            <div className="text-sm font-bold">📚 Reading List</div>
            <div className="text-xs opacity-90 mt-1">Level up your brain</div>
          </button>
          <button className="p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg">
            <div className="text-sm font-bold">🎯 Focus Mode</div>
            <div className="text-xs opacity-90 mt-1">Block the noise</div>
          </button>
        </div>
        
        {/* Morning Stats */}
        <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-800 flex items-center">
                <Sun className="w-5 h-5 mr-2 text-yellow-500" />
                Morning Hero Streak
              </div>
              <div className="text-sm text-gray-600 font-medium">7 days of mindful mornings! 🔥</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-yellow-600">7</div>
              <div className="text-xs text-gray-500">days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}