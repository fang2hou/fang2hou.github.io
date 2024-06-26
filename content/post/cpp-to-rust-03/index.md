+++
author = "Zhou Fang"
title = "由 C++ 入门 Rust 03（拷贝，所有权及引用）"
date = 2021-09-04T11:01:00+09:00
updated = "2021-09-04"
category = "开发手札"
tags = [
    "Rust",
    "C++"
]
+++

# 前言
拷贝问题，或者说拷贝背后的实现在大部分编程语言中的表现都是存在差异的。Rust 在拷贝上采用了较为少见的所有权机制。作为学习的一环，下面我会使用一些小例子进行简单的说明解释。

# 拷贝
## 种类
在看代码前，首先要复习一下深拷贝和浅拷贝的区别。

### 
**深拷贝**：其实这是最直观的拷贝形式，将拷贝对象持有的全部信息数据都执行拷贝操作，然后产生一个完全独立的对象。特点为修改深拷贝后的对象数据不会作用于原对象。

**浅拷贝**：浅拷贝对于一些常见的，特别是存放在栈上的数据采用完全拷贝字面量的操作。但是对于对象，则只会拷贝对象的数据指针，属性等。特点之与深拷贝，操作浅拷贝后的对象会同时作用于之前的对象。

## 代码 1
```rust
fn main() {
    let x = 1;
    let y = x;
    print("{}", x); // 1
    print("{}", y); // 1
}
```

这段代码是非常简洁易懂的，即程序拷贝 `x` 到 `y`。在这里 `x` 是被自动推断为了 `i32` 类型，属于指定大小的类型而不是对象，那么理应被存于栈中。上面分类中也有提到，对于这类变量，拷贝都是直接复制字面量的。所以这里的拷贝操作与一般编程语言无二。

## 代码 2

```rust
fn main() {
    let x = String::from("text");
    let y = x;
    println!("{}", y); // text
    println!("{}", x); // 无法编译
}
```
此处，就算是 Rust 语言中较为特色的「所有权机制」了。在了解所有权概念之前，我们先简单介绍一下 Rust 中的字符串是什么结构。

## 字符串
Rust 的字符串是可变长度的！说到这里，是不是已经大概能猜到字符串的结构了？没有错，字符串在 Rust 中是以对象的方式存在的。

一个 `String` 的结构如下所示

```txt
String {
    Pointer
    Length
    Capacity
}
```

`String` 对象中的实际数据其实是存放在堆上的，然后访问时按照长度大小去访问数据指针。这是一个十分自然的设计，但是在 C++ 中其实也已经很有经验了，如果一个内存地址上的信息被两个指针引用的时候，是很容易造成内存泄漏或是野指针错误的。

Rust 同样作为没有垃圾回收机制的语言，必然也是有相同的困扰。但不同于 C++ 全盘甩给程序员自己解决，Rust 强制使用了所有权概念。

即**内存上的信息只能被一个指针所占有。**

反映到 Rust 的拷贝操作中，就是一旦发生了对象的浅拷贝，那么所有权就会转移。

在上面的示例代码中，我们可以发现，`x` 作为一个承载了 `String` 对象的变量，在发生浅拷贝操作后，无法使用了，原因就是 `y` 在浅拷贝后获取了原本属于 `x` 的所有权。这样在变量作用域结束后，程序就会自动的去释放 `y` 所占用的资源，而不需要程序员去手动释放。

# 引用
至此，本文已经介绍了拷贝和所有权的一些简单概念，我们继续看下面的代码。

## 代码 3
```rust
fn main() {
    let x = String::from("text");
    test_func(x); // text
    test_func(x); // 无法编译
}

fn test_func(input: String) {
    println!("{}", input);
}
```

这段代码中，在第一次调用 `test_func` 函数的时候，我们将 `x` 给传了过去，但是第二次的调用却会导致编译错误。

这里产生这个现象的原因就是，函数传递依旧和拷贝一样会进行所有权的传递。在第一次传过去 `x` 之后，`test_func` 中的 `input` 变量持有了原属于 `x` 的所有权，那么 `x` 自然在之后的执行过程中无法被使用了。

所以，Rust 中也存在同 C++ 一样的引用机制。让我们继续看下一段代码。

## 代码 4

```rust
fn main() {
    let x = String::from("text");
    test_func(&x);
}

fn test_func(input: &String) {
    println!("{}", input);
}
```

和 C++ 的习惯一样，Rust 也是采用 `&` 和 `*` 来引用和解引用。
但是和 C++ 不一样的是，在传递引用的时候，Rust 要求十分严格的引用提示 `&x`来告诉编译器这里是在传递引用。

同时要注意的是，引用传递到函数后，函数体默认是不能进行更改引用变量的值的！如同 `let` 和 `let mut` 一般，如果需要改变，需要加上 `mut` 关键字。

## 代码 5

```rust
fn main() {
    let mut x = String::from("text");
    test_func(&mut x); // text add
    test_func(&mut x); // text add add

}

fn test_func(input: &mut String) {
    input.push_str(" add");
    println!("{}", input);
}
```

在代码 5 中，我们设定了 `test_func` 接收参数 `input` 为可变的 `String` 变量。而且，我们同时还设定了 `main` 函数中的 `x` 为可变的，且传递 `x` 进入函数的时候，也要注明这是可变的引用。

Rust 总体上是比较严谨且重视安全性的，相较于 C++ 的自由散漫，Rust 在工程上的使用个人是觉得更加安心的。
希望本文能对你学习 Rust 有一定帮助。

> 参考资料：https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html