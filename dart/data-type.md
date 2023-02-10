# 数据类型

## Number

数字支持三种类型

- `num` 数字类型，既可以是整数，又可以是小数
  - `int` 表示整数
  - `double` 表示浮点数

```dart
num num1 = 1;
int num1 = 1;
double num1 = 1.2;
```

### 方法

- `num.round()` // 四舍五入
- `num.compareTo()` // 比较

## String

1. 三个引号声明的字符串可以换行
2. `RegExp(r'xxx')` 正则表达式需要字符串前增加 `r` 标识

### 方法

- `string.contains('x')` // 是否包含字符串
- `string.replaceAll('source', 'target')` // 字符串替换

## Boolean

```dart
bool flag = true;
```

## List

`List`类似于数组

```dart
List list = [];
List<int> list = []; // int 约束元素都是整数

new List.empty(growable: true); // growable 标识数组是否能添加元素
```

1. `...?[]` 判空的拓展元素符

### 方法

初始化数组

- `new List.filled(length, value)` // 初始化长度为 length 的数组， 并填充 value。不能再添加元素

添加元素

- `array.add(x)` // 追加元素
- `array.addAll([x])` // 追加多个元素
- `array.insert(index, value)` // 在下标 index 添加元素

删除元素

- `array.remove()` // 删除元素
- `array.removeAt()` // 根据下标删除元素

反转

- `array.reversed.toList()` // 列表的反转

迭代

返回值调用 toList 才能转化为数组

> `array.where(element => bool)` // 返回符合条件的元素
> `array.any(element => bool)` // 是否包含
> `array.expand(element => element)` // 扁平化数组
> `array.fold(initialValue, (acc, element) => value)` // 循环计算 类似 js reduce

## Set

`Set` 内元素不可重复

```dart
Set set = <int>{1, 2, 3};

Set set1 = new Set();
```

### 方法

- `setA.intersection(setB)` // set 交集
- `setA.union(setB)` // set 并集
- `setA.difference(setB)` // set 求差集

## Map

```dart
Map map = {
  'a': 1
};

Map map1 = Map()
```

### 方法

- `map.containsKey(key)` // 判断 Map 中的 key 是否存在
- `map.putIfAbsent(key, () => value)` // key 不存在，才赋值
- `map.removeWhere((key, value) => bool)` // 根据条件进行删除