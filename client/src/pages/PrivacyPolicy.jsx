import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleAgree = async () => {
    if (!agreed) return;
    
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/privacy/accept', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error accepting privacy policy:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose max-w-none mb-8">
        <h2>Information We Collect</h2>
        <p>We collect browsing data to provide you with insights about your web usage patterns.</p>
        
        <h2>How We Use Your Information</h2>
        <p>Your data is used to generate personalized productivity insights and recommendations.</p>
        
        <h2>Data Security</h2>
        <p>We implement appropriate security measures to protect your personal information.</p>
        
        <h2>Contact Us</h2>
        <p>If you have questions about this privacy policy, please contact us.</p>
      </div>

      <div className="border-t pt-6">
        <label className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4"
          />
          <span>I have read and agree to the Privacy Policy</span>
        </label>
        
        <button
          onClick={handleAgree}
          disabled={!agreed}
          className={`px-6 py-2 rounded ${
            agreed 
              ? 'bg-orange-400 hover:bg-orange-500 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;