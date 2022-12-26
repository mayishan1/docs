# 服务端渲染

服务端直出 html 结构

1. 首屏加载时间长
2. seo 优化

## 同构

编写的代码，即运行在服务端，又运行在客户端。

## 服务端渲染

使用 `renderToString` 函数 将 React 元素渲染为其初始 HTML。

## 路由

### 服务端路由

支持从 url 中直接访问页面。

[StaticRouter](https://github.com/remix-run/react-router/blob/main/docs/router-components/static-router.md)

```javascript
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import http from "http";

function requestHandler(req, res) {
  let html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      {/* The rest of your app goes here */}
    </StaticRouter>
  );

  res.write(html);
  res.end();
}

http.createServer(requestHandler).listen(3000);
```

### 客户端路由

客户端跳转访问页面

[BrowserRouter](https://github.com/remix-run/react-router/blob/main/docs/router-components/browser-router.md)

```javascript
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>{/* The rest of your app goes here */}</BrowserRouter>,
  root
);
```

## next 框架

- 基于文件路径的路由
- 内置 css-in-js
- 自动拆分代码
- 支持服务端渲染或静态生成页面
- 等
