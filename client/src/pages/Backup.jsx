import React, { useState } from "react";
import { Cloud, Upload } from "lucide-react";

const Backup = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBackup = async () => {
    setLoading(true);
    setMessage("");

    try {
      let token = localStorage.getItem("token");
      
      // If no token in localStorage, try to get from extension
      if (!token) {
        try {
          const response = await new Promise((resolve) => {
            const handleMessage = (event) => {
              if (event.data.type === 'EXTENSION_AUTH_RESPONSE') {
                window.removeEventListener('message', handleMessage);
                resolve(event.data);
              }
            };
            
            window.addEventListener('message', handleMessage);
            window.postMessage({ type: 'GET_EXTENSION_AUTH' }, '*');
            
            setTimeout(() => {
              window.removeEventListener('message', handleMessage);
              resolve({ token: null });
            }, 1000);
          });
          
          if (response.token) {
            token = response.token;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(response.user));
          }
        } catch (error) {
          console.log('Extension auth check failed:', error);
        }
      }
      
      if (!token) {
        window.location.href = '/login?redirect=backup';
        return;
      }

      // Get data from extension via content script
      let extensionData = {};
      
      try {
        const response = await new Promise((resolve) => {
          const handleMessage = (event) => {
            if (event.data.type === 'EXTENSION_DATA_RESPONSE') {
              window.removeEventListener('message', handleMessage);
              resolve(event.data);
            }
          };
          
          window.addEventListener('message', handleMessage);
          window.postMessage({ type: 'GET_EXTENSION_DATA' }, '*');
          
          // Timeout after 2 seconds
          setTimeout(() => {
            window.removeEventListener('message', handleMessage);
            resolve({ data: {} });
          }, 2000);
        });
        
        if (response.data) {
          extensionData = response.data;
        }
      } catch (error) {
        console.log('Extension communication failed:', error);
      }

      const apiResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/backup/upload`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ data: extensionData }),
        }
      );

      if (apiResponse.ok) {
        setMessage("Data backed up successfully!");
      } else {
        const errorData = await apiResponse.json();
        throw new Error(errorData.error || "Backup failed");
      }
    } catch (error) {
      console.error("Backup error:", error);
      setMessage(`Backup failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Cloud className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold">Cloud Backup</h1>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <button
            onClick={handleBackup}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            <Upload className="w-5 h-5" />
            {loading ? "Backing up..." : "Backup Extension Data"}
          </button>

          {message && (
            <div
              className={`mt-4 p-3 rounded-lg ${
                message.includes("success")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Backup;
