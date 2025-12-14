import React, { useState, useEffect } from 'react';
import { BarChart3, Calendar, Trash2, Brain } from 'lucide-react';

const Stats = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Check if extension has auth data
        if (window.chrome && chrome.runtime) {
          const response = await new Promise((resolve) => {
            chrome.runtime.sendMessage({ type: 'GET_AUTH' }, resolve);
          });
          
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            // Retry with new token
            return fetchInsights();
          }
        }
        window.location.href = '/login?redirect=stats';
        return;
      }
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/stats/history`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login?redirect=stats';
        return;
      }
      
      const data = await response.json();
      setInsights(data || []);
    } catch (error) {
      console.error('Failed to fetch insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDay = async (date) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${import.meta.env.VITE_API_URL}/api/stats/day/${date}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchInsights();
    } catch (error) {
      console.error('Failed to delete day:', error);
    }
  };

  const deleteAll = async () => {
    if (confirm('Delete all data? This cannot be undone.')) {
      try {
        const token = localStorage.getItem('token');
        await fetch(`${import.meta.env.VITE_API_URL}/api/stats/all`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchInsights();
      } catch (error) {
        console.error('Failed to delete all data:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold">AI-Powered Stats</h1>
          </div>
          <button
            onClick={deleteAll}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4" />
            Delete All
          </button>
        </div>

        {insights.length === 0 ? (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No insights yet</h2>
            <p className="text-gray-500">Use the extension to generate your first AI analysis</p>
          </div>
        ) : (
          <div className="space-y-6">
            {insights.map((insight) => (
              <div key={insight.id} className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(insight.created_at).toLocaleDateString()}
                  </div>
                  <button
                    onClick={() => deleteDay(insight.created_at.split('T')[0])}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {insight.insights}
                  </div>
                </div>

                {insight.data_snapshot && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                      View raw data
                    </summary>
                    <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                      {JSON.stringify(insight.data_snapshot, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;