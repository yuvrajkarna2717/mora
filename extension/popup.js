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

document.addEventListener('DOMContentLoaded', () => {
  loadDomainData();
  document.getElementById('clearData').addEventListener('click', clearTodayData);
  document.getElementById('exportData').addEventListener('click', exportData);
});