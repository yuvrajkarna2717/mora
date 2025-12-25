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
    console.log("Init error:", error);
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
    const domain = new URL(tab.url).hostname;
    
    // Filter out unwanted domains
    if (!domain || domain === 'null' || domain === 'newtab' || domain === '') {
      stopTracking();
      return;
    }
    
    currentTab = domain;
    startTime = Date.now();
    startPeriodicSave();
  } catch (error) {
    console.log("Error getting tab:", error);
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
    // Skip saving for unwanted domains
    if (!currentTab || currentTab === 'null' || currentTab === 'newtab' || currentTab === '') {
      return;
    }
    
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
  if (state === "idle" || state === "locked") {
    saveCurrentTime();
    stopTracking();
  } else if (state === "active") {
    initializeTracking();
  }
});

// Handle authentication messages from web app
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'AUTH_SUCCESS') {
    chrome.storage.local.set({
      authToken: message.token,
      user: message.user,
      tokenExpiry: Date.now() + (7 * 24 * 60 * 60 * 1000)
    });
    sendResponse({ success: true });
  } else if (message.type === 'GET_DATA') {
    chrome.storage.local.get().then((result) => {
      console.log('Background: All storage data:', result);
      const { authToken, user, tokenExpiry, ...usageData } = result;
      console.log('Background: Auth data filtered out:', { authToken: !!authToken, user: !!user, tokenExpiry: !!tokenExpiry });
      console.log('Background: Usage data to send:', usageData);
      console.log('Background: Usage data keys:', Object.keys(usageData));
      sendResponse({ data: usageData });
    });
    return true;
  } else if (message.type === 'GET_AUTH') {
    chrome.storage.local.get(['authToken', 'user', 'tokenExpiry']).then((result) => {
      if (result.authToken && result.tokenExpiry > Date.now()) {
        sendResponse({ token: result.authToken, user: result.user });
      } else {
        sendResponse({ token: null, user: null });
      }
    });
    return true;
  }
});

chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  if (message.type === 'AUTH_SUCCESS') {
    chrome.storage.local.set({
      authToken: message.token,
      user: message.user,
      tokenExpiry: Date.now() + (7 * 24 * 60 * 60 * 1000)
    });
    sendResponse({ success: true });
  }
});

// Initialize immediately
initializeTracking();
