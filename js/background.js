const SERVER_URL = 'http://localhost:8000/plus.php/api/rms/submit';

// 从 storage 获取 token
function getToken() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['token', 'username']).then((result) => {
      resolve(result.token);
    });
  });
}

// 发送 HTML 到服务器
async function sendHTMLToServer(url, html) {
  try {
    const token = await getToken();

    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify({
        url: url,
        html: html,
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '发送失败');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('发送 HTML 到服务器失败:', error);
    throw error;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'captureHTML') {
    const html = message.html;
    const url = sender.tab.url;

    // 发送 HTML 到服务器
    sendHTMLToServer(url, html)
      .then((result) => {
        console.log('HTML 发送成功:', result);
        sendResponse({ status: 'success', message: 'HTML 已发送到服务器', data: result });
      })
      .catch((error) => {
        console.error('发送 HTML 失败:', error);
        sendResponse({ status: 'error', message: error.message });
      });

    // 异步响应
    return true;
  }
});