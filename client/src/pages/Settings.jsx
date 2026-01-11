import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useExportData } from "../hooks/useExportData";
import {
  Trash2,
  Link as LinkIcon,
  Settings as SettingsIcon,
  Globe,
  // Shield,
  // Bell,
  // Moon,
  // Sun,
  // Zap,
  // Eye,
  // EyeOff,
  // Mail,
  Download,
  Database,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const { exportData } = useExportData();
  const { user } = useSelector((state) => state.auth);
  // const [notifications, setNotifications] = useState({
  //   email: true,
  //   push: false,
  //   weekly: true,
  //   dailyReminder: true,
  //   insights: true,
  // });

  const [preferences, setPreferences] = useState({
    autoBackup: true,
  });

  useEffect(() => {
    fetchAutoBackupPreference();
  }, []);

  const fetchAutoBackupPreference = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3001/api/backup/auto-status",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setPreferences({ autoBackup: data.autoBackupEnabled });
      }
    } catch (error) {
      console.error("Error fetching auto backup preference:", error);
    }
  };

  const toggleAutoBackup = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3001/api/backup/auto-toggle",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setPreferences({ autoBackup: data.autoBackupEnabled });
      }
    } catch (error) {
      console.error("Error toggling auto backup:", error);
    }
  };

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you absolutely sure? This action cannot be undone. All your data will be permanently deleted."
      )
    ) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/api/preferences/account", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          localStorage.clear();
          navigate("/");
        } else {
          console.error("Failed to delete account");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <button
      onClick={onChange}
      className={`relative w-14 h-7 rounded-full transition-all duration-300 border-2 border-gray-900 shadow-md ${
        checked ? "bg-gradient-to-r from-amber-400 to-orange-400" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 border-2 border-gray-900 shadow-sm ${
          checked ? "translate-x-7" : "translate-x-0"
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-amber-50 pb-8 pt-30 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-orange-400 rounded-xl flex items-center justify-center border-2 border-gray-900 shadow-lg">
              <SettingsIcon className="w-6 h-6 text-gray-900" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900">
              Settings
            </h1>
          </div>
          <p className="text-lg text-gray-600 font-semibold ml-15">
            Customize your Mora experience, Yuvraj
          </p>
        </div>

        {/* Account Info Card */}
        <div className="bg-linear-to-br from-amber-400 via-orange-400 to-amber-500 rounded-2xl p-6 mb-6 border-2 border-gray-900 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-black border-2 border-gray-900 shadow-md">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xl font-black text-gray-900">{user?.name}</p>
              <p className="text-xs font-semibold text-gray-700 mt-1">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        {/* <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-900 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-amber-100">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center border-2 border-gray-900">
              <Bell className="w-5 h-5 text-gray-900" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">Notifications</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border-2 border-gray-200 hover:border-gray-900 transition-all">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Mail className="w-4 h-4 text-amber-600" />
                  <p className="font-black text-gray-900">
                    Email Notifications
                  </p>
                </div>
                <p className="text-sm text-gray-600 font-semibold">
                  Receive productivity reports via email
                </p>
              </div>
              <ToggleSwitch
                checked={notifications.email}
                onChange={() =>
                  setNotifications({
                    ...notifications,
                    email: !notifications.email,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border-2 border-gray-200 hover:border-gray-900 transition-all">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <p className="font-black text-gray-900">Push Notifications</p>
                </div>
                <p className="text-sm text-gray-600 font-semibold">
                  Get real-time alerts in your browser
                </p>
              </div>
              <ToggleSwitch
                checked={notifications.push}
                onChange={() =>
                  setNotifications({
                    ...notifications,
                    push: !notifications.push,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border-2 border-gray-200 hover:border-gray-900 transition-all">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <p className="font-black text-gray-900">Weekly Summary</p>
                </div>
                <p className="text-sm text-gray-600 font-semibold">
                  Receive weekly productivity summaries
                </p>
              </div>
              <ToggleSwitch
                checked={notifications.weekly}
                onChange={() =>
                  setNotifications({
                    ...notifications,
                    weekly: !notifications.weekly,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border-2 border-gray-200 hover:border-gray-900 transition-all">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Bell className="w-4 h-4 text-purple-600" />
                  <p className="font-black text-gray-900">Daily Reminder</p>
                </div>
                <p className="text-sm text-gray-600 font-semibold">
                  Daily focus reminders at 9 AM Paris time
                </p>
              </div>
              <ToggleSwitch
                checked={notifications.dailyReminder}
                onChange={() =>
                  setNotifications({
                    ...notifications,
                    dailyReminder: !notifications.dailyReminder,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border-2 border-gray-200 hover:border-gray-900 transition-all">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <p className="font-black text-gray-900">AI Insights</p>
                </div>
                <p className="text-sm text-gray-600 font-semibold">
                  Get personalized AI-powered productivity tips
                </p>
              </div>
              <ToggleSwitch
                checked={notifications.insights}
                onChange={() =>
                  setNotifications({
                    ...notifications,
                    insights: !notifications.insights,
                  })
                }
              />
            </div>
          </div>
        </div> */}

        {/* Preferences Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-900 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-amber-100">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center border-2 border-gray-900">
              <Globe className="w-5 h-5 text-gray-900" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">Preferences</h3>
          </div>

          <div className="space-y-6">
            {/* <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-2 border-gray-200 hover:border-gray-900 transition-all">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Moon className="w-4 h-4 text-blue-600" />
                  <p className="font-black text-gray-900">Dark Mode</p>
                </div>
                <p className="text-sm text-gray-600 font-semibold">
                  Enable dark theme for late night coding in Paris
                </p>
              </div>
              <ToggleSwitch
                checked={preferences.darkMode}
                onChange={() =>
                  setPreferences({
                    ...preferences,
                    darkMode: !preferences.darkMode,
                  })
                }
              />
            </div> */}

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border-2 border-gray-200 hover:border-gray-900 transition-all">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Database className="w-4 h-4 text-green-600" />
                  <p className="font-black text-gray-900">Auto Backup</p>
                </div>
                <p className="text-sm text-gray-600 font-semibold">
                  Automatically backup your data to cloud daily
                </p>
              </div>
              <ToggleSwitch
                checked={preferences.autoBackup}
                onChange={toggleAutoBackup}
              />
            </div>

            {/* <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border-2 border-gray-200 hover:border-gray-900 transition-all">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <p className="font-black text-gray-900">
                    Anonymous Analytics
                  </p>
                </div>
                <p className="text-sm text-gray-600 font-semibold">
                  Help improve Mora by sharing anonymous usage data
                </p>
              </div>
              <ToggleSwitch
                checked={preferences.anonymousData}
                onChange={() =>
                  setPreferences({
                    ...preferences,
                    anonymousData: !preferences.anonymousData,
                  })
                }
              />
            </div> */}
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-900 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-amber-100">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center border-2 border-gray-900">
              <LinkIcon className="w-5 h-5 text-gray-900" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">
              Connected Accounts
            </h3>
          </div>

          <div className="p-5 rounded-xl flex items-center justify-between bg-linear-to-br from-blue-50 to-cyan-50 border-2 border-gray-900 shadow-md">
            <div className="flex items-center gap-4">
              <svg className="w-12 h-12" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <div>
                <p className="font-black text-gray-900 text-lg">
                  Google Account
                </p>
                <p className="text-sm text-gray-600 font-semibold">
                  {user?.email}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-bold text-green-600">
                    Connected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-900 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-amber-100">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center border-2 border-gray-900">
              <Download className="w-5 h-5 text-gray-900" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">
              Data Management
            </h3>
          </div>

          <p className="text-sm text-gray-600 font-semibold mb-6">
            Export or manage your Mora data. You have full control over your
            information.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={exportData}
              className="p-5 rounded-xl bg-linear-to-br from-blue-50 to-cyan-50 border-2 border-gray-900 shadow-md hover:shadow-lg transition-all hover:scale-102 text-left group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center border-2 border-gray-900 group-hover:scale-110 transition-transform">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-black text-gray-900">Export Data</p>
                  <p className="text-xs text-gray-600 font-semibold">
                    Download as JSON
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700 font-medium">
                Download all your browsing data and insights
              </p>
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="p-5 rounded-xl bg-linear-to-br from-purple-50 to-pink-50 border-2 border-gray-900 shadow-md hover:shadow-lg transition-all hover:scale-102 text-left group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-400 rounded-lg flex items-center justify-center border-2 border-gray-900 group-hover:scale-110 transition-transform">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-black text-gray-900">View Data</p>
                  <p className="text-xs text-gray-600 font-semibold">
                    See what we store
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700 font-medium">
                Review all data stored about you
              </p>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-linear-to-br from-red-50 to-orange-50 rounded-2xl p-6 sm:p-8 border-2 border-red-600 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center border-2 border-gray-900">
              <Trash2 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-black text-red-600">Danger Zone</h3>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-red-600 mb-4">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-black text-gray-900 mb-2">
                  Delete Your Account
                </p>
                <p className="text-sm text-gray-700 font-semibold leading-relaxed">
                  Once you delete your account, there is no going back. This
                  will permanently delete:
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    All your browsing history and data
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    AI insights and productivity reports
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    Your account settings and preferences
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    All backups and exports
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl transition-all shadow-lg hover:shadow-xl border-2 border-gray-900 flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Delete My Account
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-bold text-red-600 mb-3">
                ⚠️ Are you absolutely sure? This action cannot be undone!
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl transition-all shadow-lg border-2 border-gray-900"
                >
                  Yes, Delete Forever
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-xl transition-all shadow-md border-2 border-gray-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Save Changes Button */}
        {/* <div className="mt-8 bg-linear-to-r from-amber-400 to-orange-400 rounded-2xl p-6 border-2 border-gray-900 shadow-xl text-center">
          <button className="w-full sm:w-auto px-12 py-4 bg-gray-900 hover:bg-gray-800 text-amber-50 font-black text-lg rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3 mx-auto">
            <CheckCircle className="w-6 h-6" />
            Save All Changes
          </button>
          <p className="text-sm font-semibold text-gray-800 mt-3">
            Your settings are automatically saved
          </p>
        </div> */}

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 font-semibold">
            Need help? Contact us at{" "}
            <a
              href="mailto:yuvrajkarna.code@gmail.com"
              className="text-amber-600 hover:text-amber-700 font-bold underline"
            >
              yuvrajkarna.code@gmail.com
            </a>
          </p>
          <p className="text-xs text-gray-500 font-medium mt-2">
            Built with ❤️ by the Mora team • Your feedback makes us better
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
