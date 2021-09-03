+++
author = "Zhou Fang"
title = "由 C++ 入门 Rust 02（隐藏）"
date = 2021-09-03T10:09:00+09:00
updated = "2021-09-03"
category = "开发手札"
tags = [
    "Rust",
    "C++"
]
+++

# 前言
之前一篇文章，有简略的介绍 Rust 中比较有特色的语法——隐藏。在本文中将会进行一个小实验来进一步了解 Rust 变量隐藏的细节。

# 理解隐藏
## 代码 1
先看下下面这段简单的代码，函数内第二行和第三行都对变量 `x` 进行了隐藏，故最后输出时，`x` 为 `yes` 字符串。

```rust
fn main() {
    let x = 1;
    let x = 2;
    let x = "yes";
    print("{}", x); // yes
}
```

## 代码 2
隐藏顾名思义就是要把变量给藏起来，但是被隐藏的变量去哪里了呢？
我们可以通过引入在 Rust 中不安全的指针概念来验证。

```rust
fn main() {
    let x = 12;
    let x_ptr_1 = &x as *const i32;
    let x = 13;
    let x_ptr_2 = &x as *const i32;
    let x = "yes";
    println!("{}", x); // yes

    unsafe {
        println!("{}", std::ptr::read(x_ptr_1)); // 12
        println!("{}", std::ptr::read(x_ptr_2)); // 13
    }
}
```

从这段代码中可以发现，Rust 对于被隐藏的对象并不会进行强制销毁，是一直存续的。
那么在实际的应用中，为了更佳的内存性能，大量的隐藏应该是作为 Rust 程序员必须要去避免的情况。