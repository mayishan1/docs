# 未定义方法

实例化类，如果调用了未声明的方法，就会调用类中的 `noSuchMethod` 方法。

```dart
class Person {
  noSuchMethod (Invocation invocation) {
    print('未定义此方法');
    // super.noSuchMethod(invocation);
  }
}

void main () {
  dynamic p = Person(); // 必须使用 dynamic
  p.info();
}
```
