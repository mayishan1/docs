# 组合函数

组合函数一般可用于函数增强，常见于三方库的中间件。下面列举 `redux` 和 `koa` 中间件实现方案。

## redux

使用示例

```javascript
const a = (next) => () => {
  console.log(1);
  next();
};

const b = (next) => () => {
  console.log(2);
  next();
};

const c = (dispatch) => () => {
  console.log(3);
  dispatch("done");
};

compose([a, b, c])(console.log)();
```

下面介绍两种实现方案。使用 `for` 相对好理解。

### for

```javascript
const compose = (middleware) => {
  return (dispatch) => {
    for (let i = middleware.length - 1; i >= 0; i--) {
      const fn = middleware[i];
      dispatch = fn(dispatch);
    }

    return dispatch;
  };
};
```

### reduce

```javascript
const compose = (middleware) => {
  return middleware.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
};
```

## koa

使用示例

```javascript
const a = async (next) => {
  console.log(1);
  await next();
  console.log(1);
};

const b = async (next) => {
  console.log(2);
  await next();
  console.log(2);
};

const c = async (next) => {
  console.log(3);
};

compose([a, b, c])();
```

实现方案

```javascript
const compose = (middleware) => {
  let i = -1;
  return dispatch(0);
  function dispatch(newI) {
    return () => {
      if (i >= newI) Promise.reject(new Error("next call more times"));
      i++;
      const fn = middleware[i];

      if (i === middleware.length) return Promise.resolve();

      try {
        return Promise.resolve(fn(dispatch(newI + 1)));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
};
```
