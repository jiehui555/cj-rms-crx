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

    console.log('后台回复：', response);
    alert('已成功发送：' + response.status);
  } catch (error) {
    console.error('发送失败：', error);
    alert('发送失败：' + error.message);
  }
});

// 将按钮添加到页面
document.body.appendChild(button);
