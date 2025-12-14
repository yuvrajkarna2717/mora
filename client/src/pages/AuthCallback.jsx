import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const user = searchParams.get('user');

      if (token && user) {
        try {
          // Save to localStorage for web app
          localStorage.setItem('token', token);
          localStorage.setItem('user', user);

          // Send to extension if available
          try {
            if (window.chrome && chrome.runtime && chrome.runtime.sendMessage) {
              chrome.runtime.sendMessage({
                type: 'AUTH_SUCCESS',
                token,
                user: JSON.parse(decodeURIComponent(user))
              });
            }
          } catch (error) {
            console.log('Extension not available:', error);
          }

          // Redirect based on original intent
          const redirect = searchParams.get('redirect') || 'dashboard';
          navigate(`/${redirect}`);
        } catch (error) {
          console.error('Auth callback error:', error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;