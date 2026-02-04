const button = document.createElement('button');
button.textContent = '收 录';
button.style.position = 'fixed';
button.style.bottom = '20px';
button.style.right = '20px';
button.style.zIndex = '9999';
button.style.padding = '10px 20px';
button.style.backgroundColor = '#007bff';
button.style.color = 'white';
button.style.border = 'none';
button.style.borderRadius = '5px';
button.style.cursor = 'pointer';
button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';

button.addEventListener('click', async () => {
  try {
    // 获取当前页面的完整 HTML 源码
    const htmlContent = document.documentElement.outerHTML;

    // 发送消息到 background.js
    const response = await chrome.runtime.sendMessage({
      action: 'captureHTML',
      html: htmlContent
    });

    if (response.status === 'success') {
      alert('HTML 已发送到服务器');
    } else {
      alert('发送失败：' + response.message);
    }
  } catch (error) {
    console.error('发送失败：', error);
    alert('发送失败：' + error.message);
  }
});

// 将按钮添加到页面
document.body.appendChild(button);
