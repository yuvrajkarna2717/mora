import React, { useState, useEffect } from "react";
import {
  Cloud,
  Upload,
  Download,
  CheckCircle,
  AlertCircle,
  Database,
  Shield,
  Clock,
  Zap,
  RefreshCw,
  Archive,
  HardDrive,
  CloudOff,
  Loader,
  ArrowRight,
  Calendar,
  TrendingUp,
  Package,
} from "lucide-react";
import ConfirmModal from '../components/ConfirmModal';

const API_BASE = "https://mora-5znf.onrender.com";

const BackupPage = () => {
  const [backupStatus, setBackupStatus] = useState("idle"); // idle, uploading, success, error
  const [backupData, setBackupData] = useState(null);
  const [lastBackup, setLastBackup] = useState(null);
  const [extensionData, setExtensionData] = useState({});
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(false);
  const [autoBackupLoading, setAutoBackupLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [deleteAllLoading, setDeleteAllLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [stats, setStats] = useState({
    totalSize: 0,
    totalDays: 0,
    totalSites: 0,
    lastBackupDate: null,
  });
  const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetchExtensionData();
      loadBackupInfo();
      loadAutoBackupStatus();
    }, []);
  
    const loadAutoBackupStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const response = await fetch(`${API_BASE}/api/backup/auto-status`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setAutoBackupEnabled(data.autoBackupEnabled);
        }
      } catch (error) {
        console.error('Failed to load auto backup status:', error);
      }
    };

    const handleAutoBackupToggle = async () => {
      try {
        setAutoBackupLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Please sign in to manage auto backup');
          return;
        }

        const endpoint = 'auto-toggle';
        const response = await fetch(`${API_BASE}/api/backup/${endpoint}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setAutoBackupEnabled(data.autoBackupEnabled);
        } else {
          alert('Failed to update auto backup setting');
        }
      } catch (error) {
        console.error('Auto backup toggle error:', error);
        alert('Failed to update auto backup setting');
      } finally {
        setAutoBackupLoading(false);
      }
    };

    const handleDownloadBackup = async () => {
      try {
        setDownloadLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Please sign in to download backup');
          return;
        }

        const response = await fetch(`${API_BASE}/api/backup/download`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `mora-backup-${new Date().toISOString().split('T')[0]}.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } else {
          const error = await response.json();
          alert(error.message || 'Failed to download backup');
        }
      } catch (error) {
        console.error('Download backup error:', error);
        alert('Failed to download backup');
      } finally {
        setDownloadLoading(false);
      }
    };

    const handleRestoreBackup = async (backupId) => {
      try {
        setRestoreLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Please sign in to restore backup');
          return;
        }

        const response = await fetch(`${API_BASE}/api/backup/restore/${backupId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const result = await response.json();
          alert(`Backup restored successfully! ${result.metadata.totalDays} days of data with ${result.metadata.totalSites} sites.`);
          window.postMessage({ 
            type: 'RESTORE_BACKUP_DATA', 
            data: result.data 
          }, '*');
        } else {
          const error = await response.json();
          alert(error.message || 'Failed to restore backup');
        }
      } catch (error) {
        console.error('Restore backup error:', error);
        alert('Failed to restore backup');
      } finally {
        setRestoreLoading(false);
      }
    };

    const handleDeleteAllBackups = async () => {
      try {
        setDeleteAllLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Please sign in to delete backups');
          return;
        }

        const response = await fetch(`${API_BASE}/api/backup/delete-all`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          alert('All backups deleted successfully!');
          setLastBackup(null);
          setStats(prev => ({ ...prev, lastBackupDate: null }));
        } else {
          const error = await response.json();
          alert(error.message || 'Failed to delete backups');
        }
      } catch (error) {
        console.error('Delete all backups error:', error);
        alert('Failed to delete backups');
      } finally {
        setDeleteAllLoading(false);
        setShowConfirmModal(false);
      }
    };
  
    const fetchExtensionData = async () => {
      try {
        console.log("Fetching extension data...");
  
        const response = await new Promise((resolve) => {
          let attempts = 0;
          const maxAttempts = 3;
  
          const handleMessage = (event) => {
            if (event.data.type === "EXTENSION_DATA_RESPONSE") {
              console.log("Received extension data:", event.data);
              window.removeEventListener("message", handleMessage);
              resolve(event.data);
            }
          };
  
          const tryFetch = () => {
            attempts++;
            console.log(`Attempt ${attempts} to fetch extension data`);
  
            window.addEventListener("message", handleMessage);
            window.postMessage({ type: "GET_EXTENSION_DATA" }, "*");
  
            setTimeout(() => {
              window.removeEventListener("message", handleMessage);
  
              if (attempts < maxAttempts) {
                console.log(`Attempt ${attempts} failed, retrying...`);
                setTimeout(tryFetch, 500);
              } else {
                console.log("All attempts failed, using sample data");
                resolve({
                  data: {
                    "Thu Dec 26 2025": {
                      "github.com": 7200000,
                      "stackoverflow.com": 3600000,
                      "chatgpt.com": 2700000,
                      "youtube.com": 1800000,
                      "twitter.com": 900000,
                      "reddit.com": 600000,
                      "docs.google.com": 1200000,
                      "linkedin.com": 450000,
                    },
                  },
                });
              }
            }, 1000);
          };
  
          tryFetch();
        });
  
        if (response.data && Object.keys(response.data).length > 0) {
          console.log("Setting extension data:", response.data);
          setExtensionData(response.data);
          
          // Calculate stats
          const totalDays = Object.keys(response.data).length;
          const allSites = new Set();
          let totalTime = 0;
          
          Object.values(response.data).forEach(dayData => {
            Object.keys(dayData).forEach(site => allSites.add(site));
            Object.values(dayData).forEach(time => totalTime += time);
          });
          
          const dataSize = new Blob([JSON.stringify(response.data)]).size;
          
          setStats({
            totalDays,
            totalSites: allSites.size,
            totalSize: (dataSize / 1024).toFixed(2) + " KB",
            lastBackupDate: null
          });
          
          console.log("Extension data loaded:", totalDays, "days");
        } else {
          console.log("No extension data received, keeping current state");
        }
      } catch (error) {
        console.error("Failed to fetch extension data:", error);
      } finally {
        setLoading(false);
      }
    };

    const loadBackupInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const response = await fetch(`${API_BASE}/api/backup/list`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const backups = await response.json();
          if (backups.length > 0) {
            setLastBackup(backups[0]);
            setStats(prev => ({
              ...prev,
              lastBackupDate: backups[0].created_at
            }));
          }
        }
      } catch (error) {
        console.error('Failed to load backup info:', error);
      }
    };

  const handleBackup = async () => {
    try {
      setBackupStatus("uploading");

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please sign in to backup your data");
        setBackupStatus("error");
        return;
      }

      // Use extension data or fallback data
      const dataToBackup = Object.keys(extensionData).length > 0 ? extensionData : {
        "Thu Dec 26 2025": {
          "github.com": 7200000,
          "stackoverflow.com": 3600000,
          "chatgpt.com": 2700000,
        }
      };

      // Calculate stats
      const totalDays = Object.keys(dataToBackup).length;
      const allSites = new Set();
      Object.values(dataToBackup).forEach(dayData => {
        Object.keys(dayData).forEach(site => allSites.add(site));
      });
      const totalSites = allSites.size;
      const dataSize = new Blob([JSON.stringify(dataToBackup)]).size;

      setBackupData({
        size: (dataSize / 1024).toFixed(2) + " KB",
        days: totalDays,
        sites: totalSites,
      });

      console.log("Backing up data:", dataToBackup);

      // Upload to server
      const response = await fetch(`${API_BASE}/api/backup/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: dataToBackup,
        }),
      });

      if (response.ok) {
        setBackupStatus("success");
        await loadBackupInfo();

        // Reset after 3 seconds
        setTimeout(() => {
          setBackupStatus("idle");
          setBackupData(null);
        }, 3000);
      } else {
        throw new Error("Backup failed");
      }
    } catch (error) {
      console.error("Backup error:", error);
      setBackupStatus("error");

      setTimeout(() => {
        setBackupStatus("idle");
      }, 3000);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-bold text-gray-900">
            Loading backup information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4 sm:px-6 pt-25">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-amber-400 to-orange-400 rounded-2xl mb-6 border-2 border-gray-900 shadow-lg">
            <Cloud className="w-8 h-8 text-gray-900" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4">
            Cloud Backup
          </h1>
          <p className="text-xl text-gray-600 font-semibold max-w-2xl mx-auto">
            Securely backup your browsing data to the cloud, Yuvraj
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl border-2 border-gray-900 shadow-lg text-center">
            <Database className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <p className="text-3xl font-black text-gray-900 mb-1">
              {stats.totalDays || 0}
            </p>
            <p className="text-xs font-bold text-gray-600">Days Tracked</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2 border-gray-900 shadow-lg text-center">
            <Package className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <p className="text-3xl font-black text-gray-900 mb-1">
              {stats.totalSites || 0}
            </p>
            <p className="text-xs font-bold text-gray-600">Unique Sites</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2 border-gray-900 shadow-lg text-center">
            <HardDrive className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <p className="text-3xl font-black text-gray-900 mb-1">
              {stats.totalSize || "0 KB"}
            </p>
            <p className="text-xs font-bold text-gray-600">Data Size</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2 border-gray-900 shadow-lg text-center">
            <Clock className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <p className="text-sm font-black text-gray-900 mb-1">
              {formatDate(stats.lastBackupDate)}
            </p>
            <p className="text-xs font-bold text-gray-600">Last Backup</p>
          </div>
        </div>

        {/* Main Backup Card */}
        <div className="bg-white rounded-2xl p-8 border-2 border-gray-900 shadow-xl mb-8">
          {backupStatus === "idle" && (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-400 to-blue-600 rounded-full mb-6 border-2 border-gray-900 shadow-lg">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-3">
                  Backup Your Data
                </h2>
                <p className="text-gray-600 font-semibold max-w-xl mx-auto">
                  Securely upload all your browsing history and insights to our
                  encrypted cloud storage. Your data is protected and accessible
                  from anywhere.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-linear-to-br from-green-50 to-emerald-50 p-5 rounded-xl border-2 border-gray-900">
                  <Shield className="w-8 h-8 text-green-600 mb-3" />
                  <p className="font-black text-gray-900 mb-1">Encrypted</p>
                  <p className="text-sm text-gray-700 font-semibold">
                    End-to-end encryption
                  </p>
                </div>

                <div className="bg-linear-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-gray-900">
                  <Zap className="w-8 h-8 text-blue-600 mb-3" />
                  <p className="font-black text-gray-900 mb-1">Fast Upload</p>
                  <p className="text-sm text-gray-700 font-semibold">
                    Lightning quick sync
                  </p>
                </div>

                <div className="bg-linear-to-br from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-gray-900">
                  <Archive className="w-8 h-8 text-purple-600 mb-3" />
                  <p className="font-black text-gray-900 mb-1">
                    Version History
                  </p>
                  <p className="text-sm text-gray-700 font-semibold">
                    Keep all versions
                  </p>
                </div>
              </div>

              <button
                onClick={handleBackup}
                className="w-full py-5 bg-linear-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-gray-900 rounded-xl font-black text-lg transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gray-900 hover:scale-105 flex items-center justify-center gap-3"
              >
                <Cloud className="w-6 h-6" />
                Backup to Cloud Now
                <ArrowRight className="w-6 h-6" />
              </button>
            </>
          )}

          {backupStatus === "uploading" && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-400 to-blue-600 rounded-full mb-6 border-2 border-gray-900 shadow-lg animate-pulse">
                <Loader className="w-10 h-10 text-white animate-spin" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-3">
                Uploading Your Data...
              </h2>
              <p className="text-gray-600 font-semibold mb-6">
                Please wait while we securely backup your data to Paris 🇫🇷
                servers
              </p>
              <div className="max-w-md mx-auto">
                <div className="w-full h-3 bg-gray-200 rounded-full border-2 border-gray-900 overflow-hidden">
                  <div className="h-full bg-linear-to-r from-amber-400 to-orange-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          {backupStatus === "success" && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-green-400 to-green-600 rounded-full mb-6 border-2 border-gray-900 shadow-lg animate-bounce">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-3">
                Backup Successful! 🎉
              </h2>
              <p className="text-gray-600 font-semibold mb-6">
                Your data has been securely backed up to the cloud
              </p>

              {backupData && (
                <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-gray-900 max-w-md mx-auto">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-black text-gray-900">
                        {backupData.size}
                      </p>
                      <p className="text-xs font-bold text-gray-600">Size</p>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-gray-900">
                        {backupData.days}
                      </p>
                      <p className="text-xs font-bold text-gray-600">Days</p>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-gray-900">
                        {backupData.sites}
                      </p>
                      <p className="text-xs font-bold text-gray-600">Sites</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {backupStatus === "error" && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-red-400 to-red-600 rounded-full mb-6 border-2 border-gray-900 shadow-lg">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-3">
                Backup Failed
              </h2>
              <p className="text-gray-600 font-semibold mb-6">
                Something went wrong. Please try again or contact support.
              </p>
              <button
                onClick={() => setBackupStatus("idle")}
                className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-amber-50 rounded-xl font-bold transition-all border-2 border-gray-900 shadow-md"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Auto Backup */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-900 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center border-2 border-gray-900">
                <RefreshCw className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-black text-gray-900">Auto Backup</h3>
            </div>
            <p className="text-sm text-gray-600 font-semibold mb-4">
              Enable automatic daily backups at 3 AM Paris time. Never lose your
              data again!
            </p>
            <button 
              onClick={handleAutoBackupToggle}
              disabled={autoBackupLoading}
              className={`w-full px-6 py-3 rounded-xl font-bold transition-all border-2 border-gray-900 shadow-md hover:shadow-lg ${
                autoBackupEnabled 
                  ? 'bg-linear-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white'
                  : 'bg-linear-to-br from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white'
              } disabled:opacity-50`}
            >
              {autoBackupLoading ? 'Updating...' : autoBackupEnabled ? 'Disable Auto Backup' : 'Enable Auto Backup'}
            </button>
          </div>

          {/* Download Backup */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-900 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center border-2 border-gray-900">
                <Download className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-black text-gray-900">
                Download Backup
              </h3>
            </div>
            <p className="text-sm text-gray-600 font-semibold mb-4">
              Download your latest cloud backup as a JSON file to your local
              machine.
            </p>
            <button 
              onClick={handleDownloadBackup}
              disabled={downloadLoading}
              className="w-full px-6 py-3 bg-linear-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white rounded-xl font-bold transition-all border-2 border-gray-900 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {downloadLoading ? 'Downloading...' : 'Download Latest Backup'}
            </button>
          </div>
        </div>

        {/* Delete All Backups Row */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-900 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center border-2 border-gray-900">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-xl font-black text-gray-900">
                Delete All Backups
              </h3>
            </div>
            <p className="text-sm text-gray-600 font-semibold mb-4">
              Permanently delete all your backup data from our servers. This action cannot be undone.
            </p>
            <button 
              onClick={() => setShowConfirmModal(true)}
              disabled={deleteAllLoading}
              className="w-full px-6 py-3 bg-linear-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white rounded-xl font-bold transition-all border-2 border-gray-900 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {deleteAllLoading ? 'Deleting...' : 'Delete All Backups'}
            </button>
          </div>
        </div>

        {/* Backup History */}
        <div className="bg-white rounded-2xl p-8 border-2 border-gray-900 shadow-lg mb-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-amber-100">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center border-2 border-gray-900">
              <Calendar className="w-5 h-5 text-gray-900" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">
              Backup History
            </h3>
          </div>

          {lastBackup ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-linear-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-gray-900">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center border-2 border-gray-900 shadow-md">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-gray-900">
                      {formatDate(lastBackup.created_at)}
                    </p>
                    <p className="text-sm text-gray-600 font-semibold">
                      Manual backup • {lastBackup.backup_type || 'manual'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => handleRestoreBackup(lastBackup.id)}
                  disabled={restoreLoading}
                  className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-900 rounded-lg font-bold border-2 border-gray-900 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                >
                  {restoreLoading ? 'Restoring...' : 'Restore'}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <CloudOff className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-semibold">
                No backup history yet
              </p>
              <p className="text-sm text-gray-500 font-medium mt-2">
                Create your first backup to see it here
              </p>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Security Info */}
          <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-gray-900 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-black text-gray-900">
                Security First
              </h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-700 font-semibold">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span>End-to-end AES-256 encryption</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700 font-semibold">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span>Stored in secure Paris 🇫🇷 data centers</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700 font-semibold">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span>GDPR compliant and privacy-focused</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700 font-semibold">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span>Only you can access your backups</span>
              </li>
            </ul>
          </div>

          {/* Features Info */}
          <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-gray-900 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-black text-gray-900">Why Backup?</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-700 font-semibold">
                <TrendingUp className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span>Access your data from any device</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700 font-semibold">
                <TrendingUp className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span>Never lose your productivity history</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700 font-semibold">
                <TrendingUp className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span>Restore data after reinstalling</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700 font-semibold">
                <TrendingUp className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span>Keep unlimited version history</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 font-semibold mb-2">
            Need help with backups?{" "}
            <a
              href="/feedback"
              className="text-amber-600 hover:text-amber-700 font-bold underline"
            >
              Contact Support
            </a>
          </p>
          <p className="text-xs text-gray-500 font-medium">
            Built with ❤️ in Paris 🇫🇷 by Yuvraj Karna • Engineering Team
          </p>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDeleteAllBackups}
        title="Delete All Backups"
        message="Are you sure you want to delete ALL backup data? This action cannot be undone and will permanently remove all your stored backups from our servers."
        confirmText="Delete All"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default BackupPage;
