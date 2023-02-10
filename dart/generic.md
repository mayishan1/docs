# 泛型

`dart` 中的泛型和 `typescript` 类似。用于动态约束类型。

泛型需要使用`<>` 进行包裹。

## 泛型函数

```dart
E func<T, E>(T v, E v1) {
  print(v);
  return v1;
}

void main() {
  print(func<String, int>('string', 1));
}
```

## 泛型类

```dart
class Person<T> {
  say(T v) {
    print(v);
  }
}

void main() {
  Person p = Person<int>();
  p.say(1);
  p.say('1'); // 报错
}
```

## 泛型约束

```dart
class BaseClass {}
class BaseClass1 {}

class Person<T extends BaseClass> {}

void main() {
  new Person<BaseClass>();
  new Person<BaseClass1>();
}
```