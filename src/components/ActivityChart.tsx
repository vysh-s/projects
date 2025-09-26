import React from 'react';

export function ActivityChart() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = [45, 62, 38, 71, 55, 89, 43]; // Minutes of brainrot content
  const maxValue = Math.max(...data);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Brainrot content (minutes)</span>
        <span className="text-gray-500">Last 7 days</span>
      </div>
      
      <div className="flex items-end justify-between h-40 space-x-2">
        {days.map((day, index) => (
          <div key={day} className="flex-1 flex flex-col items-center space-y-2">
            <div className="relative w-full bg-gray-100 rounded-t-lg overflow-hidden">
              <div 
                className="w-full bg-gradient-to-t from-purple-400 to-purple-500 rounded-t-lg transition-all duration-500 hover:from-purple-500 hover:to-purple-600"
                style={{ height: `${(data[index] / maxValue) * 120}px` }}
              />
            </div>
            <div className="text-xs font-medium text-gray-600">{day}</div>
            <div className="text-xs text-gray-500">{data[index]}m</div>
          </div>
        ))}
      </div>
    </div>
  );
}