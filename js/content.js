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


function parseLiePinHtml() {
  let resume = {
    base: {
      name: "", // 姓名
      status: "", // 状态
      gender: "", // 性别
      age: "", // 年龄
      city: "", // 城市
      education: "", // 学历
      work_experience: "", // 工龄
      salary: "", // 薪资
      political_outlook: "", // 政治面貌
      phone: "", // 联系电话
      email: "", // 联系邮箱
    },
    job_intention: {
      job: "", // 职位
      city: "", // 城市
      salary: "", // 薪资
      tags: [], // 标签
    }
  };

  // 获取姓名
  resume.base.name = (document.querySelector('#resume-detail-basic-info .name-box h4')?.textContent.trim()) ?? "";

  // 获取当前状态
  resume.base.status = (document.querySelector('#resume-detail-basic-info .name-box span.user-status-tag')?.textContent.trim()) ?? "";

  // 获取性别、年龄、学历、工龄、薪资、政治面貌
  const sepInfo = document.querySelector('#resume-detail-basic-info > div.basic-cont > div:nth-child(2)');
  if (sepInfo) {
    const items = Array.from(sepInfo.querySelectorAll('i')).map(i => i.previousSibling?.textContent?.trim()).filter(Boolean);
    console.log("整理数据 items", items);
    resume.base.gender = items[0] ?? ""; // 性别
    resume.base.age = items[1] ?? ""; // 年龄
    resume.base.city = items[2] ?? ""; // 城市
    resume.base.education = items[3] ?? ""; // 学历
    resume.base.work_experience = items[4] ?? ""; // 工龄
    resume.base.salary = items[5] ?? ""; // 薪资
    resume.base.political_outlook = items[6] ?? ""; // 政治面貌
  }

  // 获取联系方式
  const contactEmail = document.querySelector('#resume-detail-basic-info > div.basic-cont > dl > dd:nth-child(2) > img');
  if (contactEmail) {
    resume.base.email = contactEmail.getAttribute('src');
  }
  const contactPhone = document.querySelector('#resume-detail-basic-info > div.basic-cont > dl > dd:nth-child(1) > img');
  if (contactPhone) {
    resume.base.phone = contactPhone.getAttribute('src');
  }

  // 获取求职意向
  const jobIntention = document.querySelector('#resume-detail-job-exp-info');
  if (jobIntention) {
    resume.job_intention.job = (jobIntention.querySelector('span.title')?.textContent.trim()) ?? "";
    resume.job_intention.city = (jobIntention.querySelector('div.dqname-wrap')?.textContent.trim()) ?? "";
    resume.job_intention.salary = (jobIntention.querySelector('span.salary')?.textContent.trim()) ?? "";
    resume.job_intention.tags = Array.from(jobIntention.querySelectorAll('.lebels-wrap span')).map(tag => tag.textContent.trim());
  }

  return resume;
}

button.addEventListener('click', async () => {
  try {
    // 获取当前页面的完整 HTML 源码
    const htmlContent = document.documentElement.outerHTML;

    // 获取当前 host
    const host = window.location.host;

    // 获取简历信息
    let resume = {};
    if (host.endsWith("liepin.com")) {
      // 获取简历信息
      resume = parseLiePinHtml();
      console.log("整理数据 resume.base", resume.base);
    }

    // 发送消息到 background.js
    const response = await chrome.runtime.sendMessage({
      action: 'captureHTML',
      html: htmlContent,
      resume: resume,
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
