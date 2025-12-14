// Content script to bridge extension and web page
window.addEventListener('message', async (event) => {
  if (event.source !== window || !event.data.type) return;

  if (event.data.type === 'GET_EXTENSION_DATA') {
    try {
      const response = await chrome.runtime.sendMessage({ type: 'GET_DATA' });
      window.postMessage({
        type: 'EXTENSION_DATA_RESPONSE',
        data: response?.data || {}
      }, '*');
    } catch (error) {
      window.postMessage({
        type: 'EXTENSION_DATA_RESPONSE',
        data: {},
        error: error.message
      }, '*');
    }
  }

  if (event.data.type === 'GET_EXTENSION_AUTH') {
    try {
      const response = await chrome.runtime.sendMessage({ type: 'GET_AUTH' });
      window.postMessage({
        type: 'EXTENSION_AUTH_RESPONSE',
        token: response.token,
        user: response.user
      }, '*');
    } catch (error) {
      window.postMessage({
        type: 'EXTENSION_AUTH_RESPONSE',
        token: null,
        user: null,
        error: error.message
      }, '*');
    }
  }
});