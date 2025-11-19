let currentTab = null;
let startTime = null;
let saveInterval = null;

// Initialize tracking
async function initializeTracking() {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs[0]) {
      await setCurrentTab(tabs[0].id);
    }
  } catch (error) {
    console.log('Init error:', error);
  }
}

// Track active tab changes
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await saveCurrentTime();
  await setCurrentTab(activeInfo.tabId);
});

// Track URL changes in current tab
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.url && tab.active) {
    await saveCurrentTime();
    await setCurrentTab(tabId);
  }
});

// Track window focus changes
chrome.windows.onFocusChanged.addListener(async (windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    await saveCurrentTime();
    stopTracking();
  } else {
    const tabs = await chrome.tabs.query({ active: true, windowId });
    if (tabs[0]) {
      await setCurrentTab(tabs[0].id);
    }
  }
});

async function setCurrentTab(tabId) {
  try {
    const tab = await chrome.tabs.get(tabId);
    if (tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
      const domain = new URL(tab.url).hostname;
      currentTab = domain;
      startTime = Date.now();
      startPeriodicSave();
    } else {
      stopTracking();
    }
  } catch (error) {
    console.log('Error getting tab:', error);
    stopTracking();
  }
}

function startPeriodicSave() {
  if (saveInterval) clearInterval(saveInterval);
  saveInterval = setInterval(saveCurrentTime, 5000); // Save every 5 seconds
}

function stopTracking() {
  currentTab = null;
  startTime = null;
  if (saveInterval) {
    clearInterval(saveInterval);
    saveInterval = null;
  }
}

async function saveCurrentTime() {
  if (currentTab && startTime) {
    const timeSpent = Date.now() - startTime;
    const today = new Date().toDateString();
    
    const result = await chrome.storage.local.get([today]);
    const data = result[today] || {};
    
    data[currentTab] = (data[currentTab] || 0) + timeSpent;
    
    await chrome.storage.local.set({ [today]: data });
    
    // Reset start time for continuous tracking
    startTime = Date.now();
  }
}

// Initialize on startup and install
chrome.runtime.onStartup.addListener(initializeTracking);
chrome.runtime.onInstalled.addListener(initializeTracking);

// Save data when extension is suspended
chrome.runtime.onSuspend.addListener(saveCurrentTime);

// Track idle state
chrome.idle.onStateChanged.addListener((state) => {
  if (state === 'idle' || state === 'locked') {
    saveCurrentTime();
    stopTracking();
  } else if (state === 'active') {
    initializeTracking();
  }
});

// Initialize immediately
initializeTracking();