# 拓展

`extension` 用于类的拓展。

语法

```dart
extension <extension_name> on <type> {
  (<member_definition>)*
}
```

使用

```dart
extension StringExtension on String {
  info() {
    print('拓展');
  }
}

void main () {
  String str = '123';
  str.info();
}
```
