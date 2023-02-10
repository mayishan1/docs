# 运算符

## 地板除

`~/` 除法向下取整

## 类型判断

`is` 类型判断

`is!` 类型判断取反

## 避空运算符

`??` 一般避免为 null

`??=` 值为空时，才赋值

```dart
bool isTrue = null ?? true;

var undef;

undef ??= 1;
```

## 级联运算符

`..` 可以让你在同一个对象上连续调用多个对象的变量或方法

```dart
Set set = new Set();

set..add(1)..add(2)..add(3);

print(set);
```
