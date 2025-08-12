const html404 = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>MoGuQAQ - 404</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
      min-height: 100vh;
      font-family: "Segoe UI", sans-serif;
      background-size: cover;
      color: #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    body::before {
      content: "";
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      z-index: -1;
    }

    .index {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: #111;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      text-align: center;
      transition: opacity 0.6s ease;
    }

    #err_code {
      font-size: 2.5rem;
      font-weight: bold;
    }

    #err_message {
      font-size: 1.5rem;
      font-weight: normal;
      margin-top: 1rem;
      opacity: 0.8;
    }
  </style>
</head>
<body>
  <div id="index" class="index">
    <div id="err_code">404 - NotFound</div>
    <div id="err_message">页面飞往了外星！</div>
  </div>
</body>
</html>
`;

async function handleEvent(event) {
  const { request } = event;

  // 获取客户端支持的图片类型
  const accept = request.headers.get('Accept');
  const option = { eo: { image: {} } };

  // 检查客户端是否支持 WebP 格式的图片,若不支持响应原图
  if (accept && accept.includes('image/webp')) {
    option.eo.image.format = 'webp';
  }

  const response = await fetch(request, option);
  if (response.status == 200 || response.status == 304 || response.status == 206) {
    return response;
  } else {
    return new Response(html404, {
        headers: {
          'content-type': 'text/html; charset=UTF-8',
          'EO-Function-Errcode': '404',
        },
        status: 404,
      });
  }
}

addEventListener('fetch', event => {
  // 当函数代码抛出未处理的异常时，边缘函数会将此请求转发回源站 
  event.passThroughOnException();
  event.respondWith(handleEvent(event));
});
