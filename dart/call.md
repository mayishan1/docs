# call

实例化后的类，直接进行函数调用，可以触发类中定义的 `call` 方法。

```dart
class Person {
  call() {
    print('调用');
  }
}

void main () {
  Person p = Person();
  p();
}
```
