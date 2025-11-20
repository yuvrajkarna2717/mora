// src/pages/Settings.jsx
import React, { useState } from "react";
import { Bell, Trash2, Link as LinkIcon } from "lucide-react";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-heading mb-2">Settings</h1>
          <p className="text-gray-600">Customize your mora experience</p>
        </div>

        <div className="p-6 rounded-xl bg-white border border-gray-200 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5" />
            <h3 className="text-xl font-semibold">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium mb-1">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive productivity reports via email</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                className={`relative w-14 h-7 rounded-full transition-colors ${notifications.email ? "bg-gray-900" : "bg-gray-300"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${notifications.email ? "translate-x-7" : "translate-x-0"}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium mb-1">Push Notifications</p>
                <p className="text-sm text-gray-600">Get real-time alerts in your browser</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
                className={`relative w-14 h-7 rounded-full transition-colors ${notifications.push ? "bg-gray-900" : "bg-gray-300"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${notifications.push ? "translate-x-7" : "translate-x-0"}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium mb-1">Weekly Summary</p>
                <p className="text-sm text-gray-600">Receive weekly productivity summaries</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, weekly: !notifications.weekly })}
                className={`relative w-14 h-7 rounded-full transition-colors ${notifications.weekly ? "bg-gray-900" : "bg-gray-300"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${notifications.weekly ? "translate-x-7" : "translate-x-0"}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-white border border-gray-200 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <LinkIcon className="w-5 h-5" />
            <h3 className="text-xl font-semibold">Connected Accounts</h3>
          </div>
          <div className="p-4 rounded-lg flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <div>
                <p className="font-medium">Google Account</p>
                <p className="text-sm text-gray-600">Connected</p>
              </div>
            </div>
            <button className="px-4 py-2 rounded-lg font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
              Disconnect
            </button>
          </div>
        </div>

        <div className="p-6 rounded-xl border-2 bg-red-50 border-red-200">
          <div className="flex items-center gap-2 mb-4">
            <Trash2 className="w-5 h-5 text-red-500" />
            <h3 className="text-xl font-semibold text-red-500">Danger Zone</h3>
          </div>
          <p className="mb-4 text-gray-700">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;