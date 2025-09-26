import React from 'react';

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  positive: boolean;
}

export function StatsCard({ icon, title, value, change, positive }: StatsCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-pink-100 hover:border-pink-200 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow-sm">
          {icon}
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">{value}</div>
        <div className="text-sm font-bold text-gray-600">{title}</div>
        <div className={`text-xs font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </div>
      </div>
    </div>
  );
}