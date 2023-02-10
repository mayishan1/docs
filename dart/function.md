
# 函数

声明函数可以直接被声明，不需要类似 `javascript` 的关键字

## 声明

```dart
void func () {
  print('声明函数');
};

// 立即执行函数
((int v) {
  return v;
})(17);


// 箭头函数 => 仅能跟随一条语句
final arrowFn = (int v) => print(v);
```

## 参数

```dart
// String info 为必传的命名参数
// [] 为可选的命名参数
void func (String prefix, [String? suffix]) {
  print('$prefix $suffix');
};

func('hollow', 'world');

// 命名函数用 { } 包起来
void func1 (String prefix, {
  String? suffix
}) {
  print('$prefix $suffix');
};

// 命名传参使用冒号 :
func1('hollow', suffix: 'world');

// 函数作为参数 <return_type> Function(params_type)
void func2 (int Function(int) prefix) {
  prefix(1);
};

func2((v) {
  print(v);
  return v;
});
```

## 闭包

```dart
int Function() getUniqueId = (() {
  int id = 1;

  return () {
    return id++;
  };
})();

print(getUniqueId());
print(getUniqueId());
```

## 异步函数

```dart
Future asyncFunc () async {
  int a = await 1;
  print(a);
};

asyncFunc().catchError(error => print(error));
```