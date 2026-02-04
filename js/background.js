chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'captureHTML') {
    const html = message.html;
    const tabId = sender.tab.id; // 可以拿到当前 tab 的 ID

    // 在这里你可以处理收到的 HTML，例如：
    // - 保存到 storage
    // - 发送到服务器
    // - 记录日志
    console.log('收到页面 HTML，长度：', html.length);
    console.log('来自 tab：', tabId);

    // 模拟处理成功
    sendResponse({ status: 'success', message: 'HTML 已接收，长度：' + html.length });

    // 如果需要异步处理，可以在这里返回 true 表示异步响应
    return true;
  }
});