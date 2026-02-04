document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const mainForm = document.getElementById('main-form');

    // 检查 token 是否存在
    chrome.storage.local.get(['token', 'username'], (result) => {
        if (result.token) {
            loginForm.classList.add('hidden');
            mainForm.elements.username.value = result.username;
        } else {
            mainForm.classList.add('hidden');
        }
    });

    // loginForm 提交事件
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 获取表单数据
        const username = loginForm.elements.username.value;
        const password = loginForm.elements.password.value;

        // 验证表单数据
        if (!username || !password) {
            alert('请填写用户名和密码');
            return;
        }

        // todo 发送登录请求
        const url = "http://localhost:8000/plus.php/api/rms/login";
    });

    // mainForm 提交事件
    mainForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 清空 token、name、password
        chrome.storage.local.remove(['token', 'username'], () => {
            location.reload();
        });
    });
});