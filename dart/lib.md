# 库

文件头部通过 `library <LIB_NAME>` 声明库名。（可以省略）

## 系统库

[核心库](https://dart.cn/guides/libraries)

## 自定义库

lib/custom_lib.dart

````dart
library custom_lib.dart;

class CustomLib {
  final String version = '0.0.1';
}
```

main.dart

```dart
import 'lib/custom_lib.dart';

void main() {
  CustomLib cl = CustomLib();

  print(cl.version);
}
````

## 部分引入

在 `import <LIB_PATH> show` 。

`show` 后面跟着需要导入的库。

lib/libs.dart

````dart
void lib1 () {
  print('lib1');
}

void lib2 () {
  print('lib2');
}
```

main.dart

```dart
import 'lib/libs.dart' show lib1;

void main() {
  lib1();
  lib2(); // 报错
}
````

## 部分隐藏

在 `import <LIB_PATH> hide` 。

`hide` 后面跟着需要隐藏的库。

lib/libs.dart

````dart
void lib1 () {
  print('lib1');
}

void lib2 () {
  print('lib2');
}
```

main.dart

```dart
import 'lib/libs.dart' hide lib2;

void main() {
  lib1();
  lib2();  // 报错
}
````

## 别名

在 `import <LIB_PATH> as` 。

`as` 后面可跟着库的别名。

```dart
import 'lib/libs.dart' as lib1;
```

## 延迟加载

在 `import <LIB_PATH> deferred as`。

`as` 后面可跟着库的别名。

加载库使用 `libName.loadLibrary()`

```dart
import 'lib/libs.dart' deferred as deferredLibs;

void main () {
  Future run () async {
    await deferredLibs.loadLibrary();

    deferredLibs.lib1();
  }

  run();
}
```

## part 和 part of

一个大的库，可以拆分成多个子库。

通过`part` 和 `part of` 建立关系。

主库

```dart
library person;

// 与分库建立联系
part 'man.dart';
part 'woman.dart';
```

分库 `man.dart`

```dart
part of person;

class Man {
  void info () {
    print('男');
  }
}
```

分库 `woman.dart`

```dart
part of person;

class Woman {
  void info () {
    print('女');
  }
}
```

使用

```dart
import 'lib/person.dart';

void main () {
  Man().info();
}
```
