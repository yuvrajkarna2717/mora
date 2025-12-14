function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

async function loadDomainData() {
  const today = new Date().toDateString();
  const result = await chrome.storage.local.get([today]);
  const data = result[today] || {};
  
  const domainList = document.getElementById('domainList');
  
  if (Object.keys(data).length === 0) {
    domainList.innerHTML = '<div class="no-data">No browsing data for today</div>';
    return;
  }
  
  // Sort domains by time spent (descending)
  const sortedDomains = Object.entries(data)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10); // Show top 10 domains
  
  domainList.innerHTML = sortedDomains
    .map(([domain, time]) => `
      <div class="domain-item">
        <div class="domain-name">${domain}</div>
        <div class="time-spent">${formatTime(time)}</div>
      </div>
    `).join('');
}

async function clearTodayData() {
  const today = new Date().toDateString();
  await chrome.storage.local.remove([today]);
  await loadDomainData();
}

async function exportData() {
  const result = await chrome.storage.local.get();
  const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `mora-data-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  
  URL.revokeObjectURL(url);
}

const API_BASE = 'http://localhost:3001';

async function getAuthToken() {
  const result = await chrome.storage.local.get(['authToken']);
  return result.authToken;
}

async function setAuthToken(token, user) {
  await chrome.storage.local.set({ 
    authToken: token, 
    user: user,
    tokenExpiry: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
  });
}

async function isAuthenticated() {
  const result = await chrome.storage.local.get(['authToken', 'tokenExpiry']);
  console.log('Auth check:', result);
  
  if (!result.authToken || !result.tokenExpiry) {
    console.log('No token or expiry');
    return false;
  }
  
  // Check if token is expired
  if (result.tokenExpiry <= Date.now()) {
    console.log('Token expired');
    await chrome.storage.local.remove(['authToken', 'user', 'tokenExpiry']);
    return false;
  }
  
  console.log('Token valid');
  return true;
}

async function handleDetailedStats() {
  chrome.tabs.create({ url: `http://localhost:5173/stats` });
}

async function handleBackupData() {
  chrome.tabs.create({ url: `http://localhost:5173/backup` });
}

document.addEventListener('DOMContentLoaded', () => {
  loadDomainData();
  document.getElementById('detailedStats').addEventListener('click', handleDetailedStats);
  document.getElementById('backupData').addEventListener('click', handleBackupData);
  document.getElementById('clearData').addEventListener('click', clearTodayData);
  document.getElementById('exportData').addEventListener('click', exportData);
});