# 构建工具

## 定义

在前端的工作，为我们建立开发环境，产生生产资源的工具，即为构建工具。

## 问题

工具的产生一般是为了解决已有问题，或改善现状。
上面我们将构建工具做的工作分为两类，构建开发环境和构建生产资源。
在介绍构之前，抛开构建工具，我们先根据这两个方向，梳理下在工作中所面临的问题。

### 开发环境

1. 无法在描述`页面结构`时，编辑`逻辑`
2. 有可能遇到`class`的`命名冲突`
3. 有可能`使用``未声明变量`
4. `使用``Javascript新特性`
5. 在`编写代码`时，想要`立刻看到效果`，需要发布到服务器上
   1. 期望保留页面的状态（页面有表单信息，代码更改后即可以看到更新内容又保留表单信息）
6. 等
7. 
### 生产资源

1. `css`样式`兼容前缀`
2. `压缩``html/css/js/图片`
3. `合并``css/js/图片`
4. javascript 中可能`存在``非线上环境代码`
5. 等

前端同学在工作中有诸多的需求，依托于 `node`的发展，产生了很多的前端构建工具。
以上的问题，都得到了一定的解决。

## 工具

由于在不同场景下的缺陷，产生了诸多的前端构建工具。
这里根据在`github`创建时间，介绍下几个常见的构建工具。

### Browserify - 2010

#### 定义

Browserify是一个供浏览器环境使用的模块打包工具，像在node环境一样，也是通过require('modules')来组织模块之间的引用和依赖，既可以引用npm中的模块，也可以引用自己写的模块，然后打包成js文件，再在页面中通过 `script` 标签加载

#### 特点

browserify 采用了 [UNIX](https://www.ruanyifeng.com/blog/2009/06/unix_philosophy.html) （尽量用简单的方式解决问题）的设计思想，它将所有的`JS`都打包成了一个文件。
在使用上，它是基于流的形式处理转换`JS`文件。

#### 使用

```javascript
const browserify = require('browserify')
const source = require('vinyl-source-stream')

const b = browserify({
  plugin: [
      [require('esmify')]  // 支持 esm
  ],
  entries: './index.js'
});

b.bundle()
  // 这种管道式的方式，让逻辑分离更加清晰
  .pipe(source('index.js')) // 用于适配 gulp
  .pipe(gulp.dest('./dist/js/'))
```

#### 构建产物

```javascript
import dep from './dep'

console.log(dep)
```
```javascript
const dep = 'dep';

export default dep;
```

整体是一个立即执行函数 [IIEF](https://developer.mozilla.org/zh-CN/docs/Glossary/IIFE)
```javascript
(function() {
  function outer(modules, cache, entry) {
      // Save the require from previous bundle to this closure if any
      var previousRequire = typeof require == "function" && require;
  
      function newRequire(name, jumped){
          if(!cache[name]) {
              if(!modules[name]) {
                  // if we cannot find the module within our internal map or
                  // cache jump to the current global require ie. the last bundle
                  // that was added to the page.
                  var currentRequire = typeof require == "function" && require;
                  if (!jumped && currentRequire) return currentRequire(name, true);
  
                  // If there are other bundles on this page the require from the
                  // previous one is saved to 'previousRequire'. Repeat this as
                  // many times as there are bundles until the module is found or
                  // we exhaust the require chain.
                  if (previousRequire) return previousRequire(name, true);
                  var err = new Error('Cannot find module \'' + name + '\'');
                  err.code = 'MODULE_NOT_FOUND';
                  throw err;
              }
              var m = cache[name] = {exports:{}};
              modules[name][0].call(m.exports, function(x){
                  var id = modules[name][1][x];
                  return newRequire(id ? id : x);
              }, m, m.exports,outer,modules,cache,entry);
          }
          return cache[name].exports;
      }
      for(var i=0;i<entry.length;i++) newRequire(entry[i]);
  
      // Override the current require with this new one
      return newRequire;
  }
  
  return outer;
})()({
  1: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const dep = 'dep';
    var _default = dep;
    exports.default = _default;
  }, {}],
  2: [function (require, module, exports) {
    "use strict";

    var _dep = _interopRequireDefault(require("./dep"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    console.log(_dep.default);
  }, {
    "./dep": 1
  }]
}, {}, [2])
```

#### 局限

`browserify`将所有资源都打包成`一个JS`文件。由于浏览器网络的限制，加载资源都一些最佳实践。一般将不变的资源持久缓存，变的资源不做缓存，browserify 的方式不适合较大的项目。

### Webpack - 2012

#### 定义

**webpack** 是一个用于现代 JavaScript 应用程序的 _静态模块打包工具_。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 [依赖图(dependency graph)](https://webpack.docschina.org/concepts/dependency-graph/)，然后将你项目中所需的每一个模块组合成一个或多个 _bundles_，它们均为静态资源，用于展示你的内容。

####  特点

内部提供了多种前端模块方案`esm`、`commonjs`、`AMD`
不同于流式的处理方式（`xxx.pipe(parse1()).pipe(parse2())`），`webpack`是以配置化的形式去处理资源。
`webpack` 是静态资源打包器，以加载器的形式处理资源，配合`plugin`的作用去影响，将零散的模块聚合拆分成指定的模块。

####  使用
```javascript
{
  "type": "module",
  "scripts": {
    "webpack": "webpack"
  },
  "devDependencies": {
    "rollup": "^3.3.0"
    "webpack": "^5.75.0",
    "webpack-cli": "^5.0.0"
  }
}

```
```javascript
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  entry: './index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
```

#### 构建产物

```javascript
(() => {
  "use strict";
  console.log("dep");
})();
```

#### 局限

配置化较为繁琐，文档说明不够友好。相对于流式的处理方式，流式的方式编程感更强，而`webpack`配置化的形式，让人摸不到头脑。

### Rollup - 2015

#### 定义
Rollup 是一个 JavaScript 模块打包工具，可以将多个小的代码片段编译为完整的库和应用。与传统的 CommonJS 和 AMD 这一类非标准化的解决方案不同，Rollup 使用的是 ES6 版本 Javascript 中的模块标准。

#### 特点
Rollup 使用的是 ES6 版本 Javascript 中的模块标准，对代码可以做到静态分析，构建出来的包体积更小，`Tree Shaking`。
因为以上特点，`Rollup`常用于打包`npm`包。`React/Vue`就是采用`Rollup`进行打包的。

#### 使用
```json
{
  "type": "module",
  "scripts": {
    "rollup": "rollup --config rollup.config.js"
  },
  "devDependencies": {
    "rollup": "^3.3.0"
  }
}
```
```javascript
export default {
  input: "./index.js",
  output: [
    {
      file: "dist/bundle.js",
      format: "es",
    },
  ],
};
```

#### 构建产物

```javascript
const dep = 'dep';

console.log(dep);
```

#### 局限

`rollup` 在对`web`应用的打包构建方便，生态对比`webpack`相对薄弱，更适合对`Javascript`的处理。这可能跟`Rollup`的[起因](https://rollupjs.org/guide/en/)有关，他设计的初衷也处理`Javascript`。

### Parcel - 2017

#### 定义

极速零配置Web应用打包工具

#### 特点

零配置。例如项目中使用了`scss`，则仅需要安装`install sass`这个安装包即可。

#### 使用

运行`parcel build <your entry file>`

#### 构建产物

demo 同 [browserify](#w7uaD) 示例一样。

```javascript
// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === "function" && parcelRequire;
  var nodeRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === "function" && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === "string") {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = "MODULE_NOT_FOUND";
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === "function" && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})(
  {
    f6ii: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.default = void 0;
        var dep = "dep";
        var _default = dep;
        exports.default = _default;
      },
      {},
    ],
    eHzx: [function (require, module, exports) {}, {}],
    Focm: [
      function (require, module, exports) {
        "use strict";

        var _dep = _interopRequireDefault(require("./dep"));
        require("./index.scss");
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }
        console.log(_dep.default);
      },
      { "./dep": "f6ii", "./index.scss": "eHzx" },
    ],
  },
  {},
  ["Focm"],
  null
);
```

#### 局限

文档较为简单，使用不方便；缺乏定制能力；用户群体较少，社区力量薄弱。

###  小结

目前`webpack`还是最主流的前端构建工具，下载量稳居第一。上面提到的构建工具，抛去`Browserify`以外，都保持着较高的更新频率。
[更详细报告](https://bundlers.tooling.report/)

## webpack和vite

这一块主要介绍下在项目中，使用较多的两个构建工具的实现原理。

### webpack

#### 核心知识点

1. tapable 

发布订阅的库，可以为插件提供钩子。不同于一般的事件中心的方式，通过`new Function(xxx) `动态创建函数，去串联每一个回调函数。

2. compiler

webpack 中的编译管理器。

3. module

在 webpack 中用于描述资源模块的类。

#### 流程

构建流程图
![](https://cdn.nlark.com/yuque/0/2022/jpeg/638822/1668855122432-7ecfdd8b-3ee2-4de0-9323-203ec4c4f99e.jpeg)

#### 小结

`webpack`将整个构建的过程分成了不同的阶段，即在 [Compiler](https://github.com/webpack/webpack/blob/main/lib/Compiler.js) 这个构建对象，注册了不同阶段的 [钩子](https://github.com/webpack/webpack/blob/main/lib/Compiler.js)。
根据`Entry`将整个应用的依赖关系转化为相应的数据结构 [Module](https://github.com/webpack/webpack/blob/main/lib/Module.js) 形式。
数据开始经过 [Compiler](https://github.com/webpack/webpack/blob/main/lib/Compiler.js) 每一个阶段的  [钩子](https://github.com/webpack/webpack/blob/main/lib/Compiler.js) ， 这其中都会受到 `loader`及`plugin`的影响，最终将数据结构转为真实的文件。

### vite

#### 核心知识点

1.  ESM

可以将 Javascript 程序拆分为可按需导入的单独模块。

2. transformRequest

vite 根据 `import xxx from 'xxx'` 加载不同的资源是，返回给前端`可执行`的`JS`。

3. esbuild

极速的 Javascript 打包器。

#### 流程

开发启动流程图
![image.png](https://cdn.nlark.com/yuque/0/2022/png/638822/1668857438496-5dfa7e26-e0cc-432a-91ac-1c960c932e9c.png#averageHue=%23303841&clientId=u82dee543-2d3b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=515&id=ud18c7b1a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1030&originWidth=1646&originalType=binary&ratio=1&rotation=0&showTitle=false&size=261872&status=done&style=none&taskId=ua0a23fab-6e37-4dc1-ba56-13886752d2e&title=&width=823)

#### 小结

`vite` 利用 `esm` 的方式，动态的去加载开发资源，而不是将整个工程预先打包，做到快速启动的目的。
搭配 `esbuild` 高性能，可以快速的处理相应按需加载的资源，避免了因按需加载的延迟影响。

## esbuild和swc拓展

由于`Javascript`语言本身`JIT`（Just In Time 运行时编译）的限制，用`AOT`（Ahead Of Tim 运行前编译）类型的语言更高效。

#### esbuild

极速的 Javascript 打包器。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/638822/1668833993792-413336a0-2dc9-4af3-8dd1-0805ee05c8b5.png#averageHue=%23cec8b6&clientId=u82dee543-2d3b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=280&id=u3cbf46ad&margin=%5Bobject%20Object%5D&name=image.png&originHeight=560&originWidth=1600&originalType=binary&ratio=1&rotation=0&showTitle=false&size=93710&status=done&style=none&taskId=uea745833-82e3-4a32-8a77-03c95070753&title=&width=800)

### swc

SWC 可用于编译和捆绑。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/638822/1668834127745-bae2db0c-7804-453e-b3fa-78ecf40e477b.png#averageHue=%2399928c&clientId=u82dee543-2d3b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=101&id=ua97010df&margin=%5Bobject%20Object%5D&name=image.png&originHeight=202&originWidth=1774&originalType=binary&ratio=1&rotation=0&showTitle=false&size=48889&status=done&style=none&taskId=u1a94639f-a23a-4052-bc4a-9f3fd8a9fd1&title=&width=887)

## 思考

1. 产出的工具一般都是用来解决问题，所以我们要更加明确问题的本质。
2. 工具在发展过程中，都吸取了历史经验，并作出优化。我们可以总结出两个方向：
   1. 增加
      1. 增加缓存
      2. 增加进程
      3. 增加速度（物理文件转换为内存）
      4. ...
   2. 减少
      1. 减少范围
      2. 减少体积
      3. 减少数量
      4. ...
3. 多关注新知识


