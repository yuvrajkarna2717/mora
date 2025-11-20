// src/pages/Comparison.jsx
import React from 'react';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Comparison = () => {
  const weekComparison = [
    { metric: 'Total Time', thisWeek: '42h 30m', lastWeek: '38h 15m', change: '+11%', positive: true },
    { metric: 'Productive Time', thisWeek: '28h 45m', lastWeek: '24h 30m', change: '+17%', positive: true },
    { metric: 'Distracting Time', thisWeek: '13h 45m', lastWeek: '13h 45m', change: '0%', positive: true },
    { metric: 'Productivity Score', thisWeek: '68%', lastWeek: '64%', change: '+6%', positive: true },
  ];

  const monthComparison = [
    { metric: 'Total Time', thisMonth: '165h', lastMonth: '158h', change: '+4%', positive: true },
    { metric: 'Productive Time', thisMonth: '112h', lastMonth: '98h', change: '+14%', positive: true },
    { metric: 'Distracting Time', thisMonth: '53h', lastMonth: '60h', change: '-12%', positive: true },
    { metric: 'Productivity Score', thisMonth: '68%', lastMonth: '62%', change: '+10%', positive: true },
  ];

  const chartData = [
    { day: 'Mon', thisWeek: 7.5, lastWeek: 6.2 },
    { day: 'Tue', thisWeek: 6.2, lastWeek: 5.8 },
    { day: 'Wed', thisWeek: 8.1, lastWeek: 7.3 },
    { day: 'Thu', thisWeek: 5.8, lastWeek: 6.5 },
    { day: 'Fri', thisWeek: 7.3, lastWeek: 6.8 },
    { day: 'Sat', thisWeek: 4.5, lastWeek: 3.2 },
    { day: 'Sun', thisWeek: 3.2, lastWeek: 2.7 },
  ];

  const bestWorstDays = {
    best: { day: 'Wednesday', time: '8h 15m', score: 78 },
    worst: { day: 'Sunday', time: '3h 12m', score: 42 }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-heading mb-2">Comparison</h1>
          <p className="text-gray-600">Track your productivity changes over time</p>
        </div>

        <div className="p-6 rounded-xl bg-white border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-semibold">This Week vs Last Week</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {weekComparison.map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-gray-50">
                <p className="text-sm mb-2 text-gray-600">{item.metric}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold">{item.thisWeek}</span>
                  <div className={`flex items-center gap-1 ${item.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {item.positive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    <span className="font-semibold">{item.change}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Last week: {item.lastWeek}</p>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#000000' }} />
              <Legend />
              <Bar dataKey="thisWeek" fill="#3b82f6" name="This Week" radius={[8, 8, 0, 0]} />
              <Bar dataKey="lastWeek" fill="#9ca3af" name="Last Week" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 rounded-xl bg-white border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-semibold">This Month vs Last Month</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {monthComparison.map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-gray-50">
                <p className="text-sm mb-2 text-gray-600">{item.metric}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold">{item.thisMonth}</span>
                  <div className={`flex items-center gap-1 ${item.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {item.positive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    <span className="font-semibold">{item.change}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Last month: {item.lastMonth}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="text-green-500" />
              Best Day This Week
            </h3>
            <div className="text-3xl font-bold mb-2">{bestWorstDays.best.day}</div>
            <div className="text-lg mb-1 text-gray-700">{bestWorstDays.best.time} active</div>
            <div className="text-2xl font-semibold text-green-500">Score: {bestWorstDays.best.score}%</div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-200">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingDown className="text-red-500" />
              Needs Improvement
            </h3>
            <div className="text-3xl font-bold mb-2">{bestWorstDays.worst.day}</div>
            <div className="text-lg mb-1 text-gray-700">{bestWorstDays.worst.time} active</div>
            <div className="text-2xl font-semibold text-red-500">Score: {bestWorstDays.worst.score}%</div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200">
          <h3 className="text-2xl font-semibold mb-4">AI Deep Insights</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/50">
              <h4 className="font-semibold mb-2">Productivity Trend</h4>
              <p className="text-gray-700">Your productivity has increased by 14% this month. You're consistently hitting your peak performance between 9 AM and 12 PM.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/50">
              <h4 className="font-semibold mb-2">Distraction Pattern</h4>
              <p className="text-gray-700">Social media usage has decreased by 12% compared to last month. Keep up the good work! Consider maintaining this pattern.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/50">
              <h4 className="font-semibold mb-2">Recommendation</h4>
              <p className="text-gray-700">Your Sunday productivity is 45% lower than your weekly average. Try scheduling lighter tasks or taking intentional breaks on this day.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparison;