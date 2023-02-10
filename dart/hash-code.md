# 哈希码

`hashCode` 是 dart 类的唯一标识。

可以用过 hashCode 判断两个对象是否相同。

```dart
class Person {
  static Person? instance;

  Person._internal();

  static getInstance () {
    if (instance == null) {
      instance = Person._internal();
    }

    return instance;
  }

  factory Person () => getInstance();
}
void main () {
  dynamic p = Person();
  dynamic p1 = Person();

  print(p.hashCode == p1.hashCode);
}
```