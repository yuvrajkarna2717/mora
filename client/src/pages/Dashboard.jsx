// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { Clock, TrendingUp, BarChart3, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
  const todayData = {
    totalTime: '6h 32m',
    productive: '4h 15m',
    distracting: '2h 17m',
    productivityScore: 65
  };

  const categoryData = [
    { name: 'Work', value: 240, color: '#3b82f6' },
    { name: 'Social Media', value: 90, color: '#ef4444' },
    { name: 'Entertainment', value: 45, color: '#f59e0b' },
    { name: 'Learning', value: 75, color: '#10b981' },
  ];

  const weeklyData = [
    { day: 'Mon', hours: 7.5 },
    { day: 'Tue', hours: 6.2 },
    { day: 'Wed', hours: 8.1 },
    { day: 'Thu', hours: 5.8 },
    { day: 'Fri', hours: 7.3 },
    { day: 'Sat', hours: 4.5 },
    { day: 'Sun', hours: 3.2 },
  ];

  const topDistractingSites = [
    { name: 'YouTube', time: '1h 25m', percentage: 38 },
    { name: 'Twitter', time: '45m', percentage: 20 },
    { name: 'Reddit', time: '32m', percentage: 14 },
    { name: 'Instagram', time: '28m', percentage: 12 },
    { name: 'TikTok', time: '15m', percentage: 7 },
  ];

  const aiInsights = [
    'Your productivity peaks between 9 AM - 12 PM. Schedule important tasks during this window.',
    'You spend 35% more time on social media on Fridays. Consider blocking these sites.',
    'Your focus sessions average 45 minutes. Try the Pomodoro technique for better results.',
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-heading mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your productivity overview.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-blue-500" />
              <span className="text-sm text-gray-600">Today</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{todayData.totalTime}</h3>
            <p className="text-gray-600">Total Time</p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <span className="text-sm text-gray-600">Productive</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{todayData.productive}</h3>
            <p className="text-gray-600">Productive Time</p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-red-500" />
              <span className="text-sm text-gray-600">Distracting</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{todayData.distracting}</h3>
            <p className="text-gray-600">Distracting Time</p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-yellow-500" />
              <span className="text-sm text-gray-600">Score</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{todayData.productivityScore}%</h3>
            <p className="text-gray-600">Productivity Score</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-xl bg-white border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyData}>
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#000000' }} />
                <Line type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 rounded-xl bg-white border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#000000' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {categoryData.map((cat, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: cat.color }}></div>
                  <span className="text-sm text-gray-600">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-white border border-gray-200 mb-8">
          <h3 className="text-xl font-semibold mb-4">Top 5 Distracting Sites</h3>
          <div className="space-y-4">
            {topDistractingSites.map((site, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{site.name}</span>
                  <span className="text-gray-600">{site.time}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200">
                  <div className="h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500" style={{ width: `${site.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-yellow-500" />
            <h3 className="text-xl font-semibold">AI Insights (Pro)</h3>
          </div>
          <div className="space-y-3">
            {aiInsights.map((insight, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-white/50">
                <p className="text-gray-700">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;