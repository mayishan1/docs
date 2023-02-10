# 类

`import` 加载的类，下划线开头变量名、方法为私有内容。

## 普通

```dart
class Person {
  Person () {
    print('这里进行初始化逻辑');
  }
}

void main () {
  Person a = new Person();
}
```

## 初始化

简化参数的初始化

```dart
class Person {
  String sex = '';

  Person() : sex = '男'; // 这里使用 : 可以直接对属性进行初始化
}

void main () {
  Person man = Person();

  print('${man.sex}');
}
```

## 命名构造函数

可以让初始化逻辑更清晰

```dart
class ImmutableClass {
  String sex = '';

  Person (this.sex);
}

void main () {
  Person man = Person.man();
  Person woman = Person.woman();

  print('${man.sex} ${woman.sex}');
}
```

## 常量构造函数

因为是常量，可以提高性能。

```dart
class ImmutableClass {
  final String sex; // 需要变量以 final 开头

  const ImmutableClass (this.sex); // 不能写 函数 body
}

void main () {
  final man = const ImmutableClass('男');
  final man1 = const ImmutableClass('男');

  print(man == man1);
}
```

## 修饰符

### Getter Setter

```dart
class Utils {
  int _id = 1;

  get id {
    return _id++;
  }

  set updateId (int v) {
    this._id = v;
  }
}

Utils utils = new Utils();

void main() {
  utils.updateId = 123;
  print(utils.id);
  print(utils.id);
}
```

### static

静态属性

```dart
class Person {
  static const String man = '男';

  static const String woman = '女';
}

void main() {
  print(Person.man);
  print(Person.woman);
}
```

### deprecated

弃用的方法

```dart
class Person {
  // 标记次方法已废弃
  @deprecated
  deprecatedFn() {
    print('已废弃');
  }
}

void main() {
  Person().deprecatedFn();
}
```

## 抽象类

`abstract` 一般用于描述类的结构，不能被实例化

```dart
abstract class Person {
  void walk(); // 走路
}

class Man extends Person {
  @override
  void walk() {
    print('走路');
  }
}

void main() {
  Man m = new Man();
  m.walk();
}
```

## 接口实现

`implements` 用于一个或多个接口实现的类。接口一般都是 **抽象类**。

抽象类中的属性和方法都必须被实现。

```dart
abstract class Man {
  void run();
}

abstract class Woman {
  void walk();
}

class Person implements Man, Woman {
  @override
  void run() {
    print('跑步');
  }

  @override
  void walk() {
    print('走路');
  }
}

void main() {
  Person p = new Person();
  p.run();
  p.walk();
}
```

## 混入

`with` 可以混入多个类，提高代码复用率。

```dart
class Man {
  run() {
    print('跑步');
  }
}

mixin Woman {
  void walk() {
    print('走路');
  }
}

class Person with Man, Woman {}

void main() {
  Person p = new Person();
  p.run();
  p.walk();
}
```

## 单例

```dart
class SinglePersonClass {
  String name;

  static SinglePersonClass? instance;

  factory SinglePersonClass(name) {
    if (SinglePersonClass.instance == null) {
      SinglePersonClass.instance = new SinglePersonClass.person(name);
    }

    return SinglePersonClass.instance as SinglePersonClass;
  }

  SinglePersonClass.person(this.name);
}

void main() {
  // 实例化操作
  SinglePersonClass person = SinglePersonClass('小明');
  SinglePersonClass person1 = SinglePersonClass('小李');
  print(person.name);
  print(person1.name);
}
```