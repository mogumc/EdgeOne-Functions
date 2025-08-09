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

const html403 = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>MoGuQAQ - 403</title>
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
    <div id="err_code">403 - Forbidden</div>
    <div id="err_message">你不该这样做...</div>
  </div>
</body>
</html>
`;

const html502 = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>MoGuQAQ - 502</title>
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
    <div id="err_code">502 - BadGateway</div>
    <div id="err_message">我们遇到了点问题！暂时的！</div>
  </div>
</body>
</html>
`;

async function handleRequest(request) {
  const response = await fetch(request);

  switch (response.status) {
    case 404:
      return new Response(html404, {
        headers: {
          'content-type': 'text/html; charset=UTF-8',
          'EO-Function-Errcode': '404',
        },
        status: 404,
      });
      break;
    case 403:
        return new Response(html403, {
        headers: {
          'content-type': 'text/html; charset=UTF-8',
          'EO-Function-Errcode': '403',
        },
        status: 403,
      });
      break;
    case 502:
      return new Response(html502, {
        headers: {
          'content-type': 'text/html; charset=UTF-8',
          'EO-Function-Errcode': '502',
        },
        status: 502,
      });
      break;
    default:
      response.headers.append('EO-Function-Errcode', response.status);
      return response;
      break;
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});