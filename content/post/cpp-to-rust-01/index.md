+++
author = "Zhou Fang"
title = "由 C++ 入门 Rust 01（函数变量）"
date = 2021-05-25T13:19:20+09:00
updated = "2018-02-16"
category = "开发手札"
tags = [
    "Rust",
    "C++"
]
+++

# Rust

Rust 是一款主攻编程安全的语言，其最引人注目的就是所有权概念。在该概念下你不需要费神考虑是否存在内存上的编程陷阱，大部分操作都会被 Rust 编译器自动捕获。同时，Rust 还提供了便利的垃圾回收机制。作为这几年的新起之秀，Rust 越来越被广泛的运用于日常开发之中。

本系列文章将尝试从一位 C++ 学习者的视角来掌握 Rust 中的核心概念。

# 安装 Rust

## Rust

[Rust 官方下载页面](https://www.rust-lang.org/tools/install)
Rust 提供了一个 CLI 的官方的在线安装包，如果你需要自定义可以仔细查看安装程序在命令行或终端中的文字信息提示。

## 什么是 `cargo`

Rust 提供了独有的现代开发工具 `cargo`，能够承担起项目包管理器，类似于 CMake 的自动化编译工具，自动格式化工具等等。
在安装 Rust 后， `cargo` 将会自动安装到你的电脑上，建议选中自动添加命令到 `PATH`，这可以让生活便利不少。

# 程序入口

和常规的教程不同，在写 Hello, World 程序之前，我们得先搞懂 Rust 的程序入口是什么。

```rust
fn main() {}
```

和 C++ 类似，Rust 一样采用了 `main` 函数作为程序入口，但是写法上更加的简洁。
函数如何定义将在后面详细介绍。

# Hello world

这里我们直接调用 `println!()` 函数来输出文字到标准输出。
和 C++惯用的流不同，Rust 输入输出更加偏向于传统 C 的风格。

```rust
fn main() {
    println!("Hello world!");
}
```

# 基础变量的使用

## 变量的声明

Rust 是拥有自动类型推断功能的，比如可以这样定义一个整数型的变量。

```rust
let a = 1;
```

你当然也可以自已指定类型，就像：

```rust
let a: u32 = 1;
```

但是这里需要格外注意的就是，`let` 声明的变量不能被修改！

```rust
let a = 1;
a = 2; // 错误！
```

为了解决这个问题，你可以通过加上 `mut` 关键字来修饰这个变量让其转化为可变。

```rust
let mut a = 1;
a = 2; // 可行！
```

## 变量的类型

在上一节之中，我们使用了 `u32` 这个类型，事实上还有许多内置的类型。
有序整数型：`i8`,`i16`,`i32`, `i64`, `i128`
无序整数型：`i8`,`u16`,`u32`, `u64`, `u128`
浮点数型：`f32`, `f64`
单字符型：`char`
字符串型：`str`

元组也是可以作为变量类型！

```rust
let c: f64 = 2.0; // 64 位浮点数型
let d = "Hello"; // 字符串型
let f = '猪'; // 单字符型【单引号使用】
let g: (i32, f64, char) = (1, 2.0, 'G'); // 元组
```

一般来说这些内置的类型都位于栈，而不是堆。
请注意这点，因为这在后面所有权的解说时将会变得非常重要。

## 变量的隐藏

隐藏这个术语在英语中对应的表达是 Shadowing，是个极其常用的概念。
直接从例子理解吧~

```rust
let a = 1;
let a = "Hello!"; // 这里的 a 已经不是上面的 a 了，上一行的 a 被隐藏
```

隐藏的意义就在于重复利用一个命名的变量，因为是隐藏了上一次的使用，所以类型什么的变化也是完全可以的。
这里最容易混淆的就是「是否可以隐藏可变的变量？」答案是**不行**！

```rust
let mut a = 1;
let a = "Hello!"; // 错误！
```

# 函数

刚刚我们详细介绍了变量的基础使用方式，下面我们一起来看看函数的一些定义。
函数在 Rust 中的表达是十分简洁的，比如一个无返回值的函数可以直接写作：

```rust
fn test_function() {
    let a = 1;
}
```

而对于含有参数和返回值的函数，Rust 的写法可能更加像 Go 语言。

```rust
fn test_function(x: u32, y: u32) -> u32 {
    let temp = x + y;
    return temp;
}
```

而事实上，在 Rust 的返回行中，可以不需要用`return`，而是采用右值的方式。

```rust
fn test_function(x: u32, y: u32) -> u32 {
    let temp = x + y;
    temp
}
```

进一步简化

```rust
fn test_function(x: u32, y: u32) -> u32 {
    x + y
}
```

是不是非常简洁？
