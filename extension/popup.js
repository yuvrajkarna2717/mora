// popup.js - CORRECTED VERSION

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

  const domainList = document.getElementById("domainList");

  // Calculate total time and sites count
  const totalTimeMs = Object.values(data).reduce((sum, time) => sum + time, 0);
  const sitesCount = Object.keys(data).length;

  // Update stats
  document.getElementById("totalTime").textContent = formatTime(totalTimeMs);
  document.getElementById("sitesCount").textContent = sitesCount;

  if (Object.keys(data).length === 0) {
    domainList.innerHTML = `
      <div class="no-data">
        <div class="no-data-icon">🌱</div>
        <div>No browsing data for today</div>
        <div style="font-size: 11px; margin-top: 4px; color: #9ca3af;">Start browsing to see your stats!</div>
      </div>
    `;
    return;
  }

  // Sort domains by time spent (descending)
  const sortedDomains = Object.entries(data)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10); // Show top 10 domains

  // Build HTML using proper string concatenation
  domainList.innerHTML = sortedDomains
    .map(([domain, time], index) => {
      const medal =
        index === 0 ? "🥇 " : index === 1 ? "🥈 " : index === 2 ? "🥉 " : "";
      const formattedTime = formatTime(time);

      return `
        <div class="domain-item">
          <div class="domain-name">
            ${medal}${domain}
          </div>
          <div class="time-spent">${formattedTime}</div>
        </div>
      `;
    })
    .join("");
}

async function clearTodayData() {
  if (
    !confirm(
      "Are you sure you want to clear today's data? This cannot be undone."
    )
  ) {
    return;
  }

  const today = new Date().toDateString();
  await chrome.storage.local.remove([today]);
  await loadDomainData();

  // Show success message
  showNotification("✅ Today's data cleared successfully!");
}

async function exportData() {
  const result = await chrome.storage.local.get();
  const blob = new Blob([JSON.stringify(result, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `mora-data-${new Date().toISOString().split("T")[0]}.json`;
  a.click();

  URL.revokeObjectURL(url);

  // Show success message
  showNotification("📥 Data exported successfully!");
}

function showNotification(message) {
  // Create a temporary notification element
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    border: 2px solid #111827;
    font-weight: 700;
    font-size: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: slideDown 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  // Add animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

  // Remove after 2 seconds
  setTimeout(() => {
    notification.style.animation = "slideDown 0.3s ease reverse";
    setTimeout(() => {
      document.body.removeChild(notification);
      document.head.removeChild(style);
    }, 300);
  }, 2000);
}

const API_BASE = "https://mora-5znf.onrender.com";
const UI_BASE = "https://moraextension.pages.dev";

async function getAuthToken() {
  const result = await chrome.storage.local.get(["authToken"]);
  return result.authToken;
}

async function setAuthToken(token, user) {
  await chrome.storage.local.set({
    authToken: token,
    user: user,
    tokenExpiry: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

async function isAuthenticated() {
  const result = await chrome.storage.local.get(["authToken", "tokenExpiry"]);
  console.log("Auth check:", result);

  if (!result.authToken || !result.tokenExpiry) {
    console.log("No token or expiry");
    return false;
  }

  // Check if token is expired
  if (result.tokenExpiry <= Date.now()) {
    console.log("Token expired");
    await chrome.storage.local.remove(["authToken", "user", "tokenExpiry"]);
    return false;
  }

  console.log("Token valid");
  return true;
}

async function handleDetailedStats() {
  chrome.tabs.create({ url: `${UI_BASE}/signin?redirect=/dashboard` });
}

async function handleBackupData() {
  chrome.tabs.create({ url: `${UI_BASE}/signin?redirect=/backup` });
}

// Auto-refresh data every 5 seconds when popup is open
let refreshInterval;

function startAutoRefresh() {
  refreshInterval = setInterval(() => {
    loadDomainData();
  }, 5000);
}

function stopAutoRefresh() {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", async () => {
  // Load initial data
  await loadDomainData();

  // Start auto-refresh
  startAutoRefresh();

  // Event listeners
  document
    .getElementById("detailedStats")
    .addEventListener("click", handleDetailedStats);
  document
    .getElementById("backupData")
    .addEventListener("click", handleBackupData);
  document
    .getElementById("clearData")
    .addEventListener("click", clearTodayData);
  document.getElementById("exportData").addEventListener("click", exportData);

  // Check authentication status and update UI
  const authenticated = await isAuthenticated();
  if (authenticated) {
    const result = await chrome.storage.local.get(["user"]);
    if (result.user) {
      // Update subtitle with user name
      const subtitle = document.querySelector(".subtitle");
      subtitle.textContent = `Welcome back, ${
        result.user.name || "Yuvraj"
      }! 👋`;
    }
  }
});

// Stop auto-refresh when popup closes
window.addEventListener("unload", stopAutoRefresh);

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + E for export
  if ((e.ctrlKey || e.metaKey) && e.key === "e") {
    e.preventDefault();
    exportData();
  }

  // Ctrl/Cmd + B for backup
  if ((e.ctrlKey || e.metaKey) && e.key === "b") {
    e.preventDefault();
    handleBackupData();
  }

  // Ctrl/Cmd + D for detailed stats
  if ((e.ctrlKey || e.metaKey) && e.key === "d") {
    e.preventDefault();
    handleDetailedStats();
  }
});
