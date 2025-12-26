import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicyGuard = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkPrivacyPolicy = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/privacy/status', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (!data.accepted) {
            navigate('/privacy-policy');
            return;
          }
          setAccepted(true);
        }
      } catch (error) {
        console.error('Privacy policy check error:', error);
      }
      
      setLoading(false);
    };

    checkPrivacyPolicy();
  }, [navigate]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return children;
};

export default PrivacyPolicyGuard;