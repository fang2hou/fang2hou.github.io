+++
author = "Zhou Fang"
title = "由 C++ 入门 Rust 05（结构体）"
date = 2021-11-13T16:54:40+09:00
updated = "2021-11-13"
category = "开发手札"
tags = [
    "Rust",
    "C++"
]
+++

结构体，老生常谈的编程语言概念了。本文就不多做基本介绍，直击一些 Rust 的特殊用法或是写法。

# 基本写法

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}
```

如上所示，这是一个简单到不能再简单的 `User` 结构体。我们可以通过指定字段对其进行修改。

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

fn main() {
    let mut user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };
    
    user1.email = String::from("anotheremail@example.com");
}

```

# 简化写法
## 同名变量自动调用
我们之前也介绍过了所有权系统，如果将一个结构体作为函数的返回值给到外部，所有权也会进行转交。也就是说，函数中初始化一个结构体然后返回到外部其实和直接写没啥区别。

```rust
fn build_user(email: String, username: String) -> User {
    User {
        email: email,
        username: username,
        active: true,
        sign_in_count: 1,
    }
}
```

Rust 对于 `email: email` 这样类似于脱裤子的放屁的写法不是很认同，所以我们可以使用简化写法如下：

```rust
fn build_user(email: String, username: String) -> User {
    User {
        email,
        username,
        active: true,
        sign_in_count: 1,
    }
}
```

## 自动补全并复制
假设我们要复制一个结构体，但是其中部分信息不同于之前的，需要进行修改。一般来说，基于之前的编程语言学习, 就有下述非常自然的写法。

```rust
let user2 = User {
    email: String::from("another@example.com"),
    username: String::from("anotherusername567"),
    active: user1.active,
    sign_in_count: user1.sign_in_count,
};
```

_复制了，但没完全复制_。对于这种情况，Rust 提供了一种兼具可读性和便捷性的写法。

```rust
let user2 = User {
    email: String::from("another@example.com"),
    username: String::from("anotherusername567"),
    ..user1
};
```

其中的 `..` 意思为除了显式指定的字段外，与右侧指定结构体中的字段相同。

# 元组结构体
有时候，给结构体中的每个字段写个名字还挺麻烦的，特别是针对一些约定俗成的结构，比如 RGB 颜色，三位坐标等等。这个时候，就可以使用 Rust 中的元组结构体来完成工作。

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

let black = Color(0, 0, 0);
let origin = Point(0, 0, 0);
```

虽然 `Color` 和 `Point` 中都存在了 3 个 `i32` 类型的值，但是终究是两个不同的结构体，所以依旧是不能进行同类型操作的。

# 类单元结构体

```rust
struct MyUnit;
```

顾名思义，同单元 `()` 很像，啥也不是。个人认为是用来装饰或是提升代码可读性的，比如在后续的泛型 Trait 中使用。

# 结构体方法

结构体依旧是可以拥有自己的方法的，这往往可以进一步提升代码的可读性。

比如下面的代码对于长方形面积的计算可以使用结构体方法来代替新建外部函数。

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn square(size: u32) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    let rect2 = Rectangle::square(3);

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}

```

方法的声明和书写非常的便捷。使用 `impl` 关键字来实现 `Rectangle` 结构的方法。`impl` 代码块可以多个，Rust 自动会进行识别和合并，而不是采用最后一个代码块。

`area` 函数的参数为 `&self`, 在计算的时候不需要获取到所有权，所以使用引用的方式进行传递。如果想要进行结构体数据的修改，那么就加入 `mut` 关键字，变成 `&mut self`. 

`square` 函数的输入值为一个 `u32` 类型，同上面的 `&self` 不太一样，对于这种函数，我们可以用 `Rectangle::square(3);` 这样的形式来使用它，这也是我们经常在系统级库中看到的使用形式。

这里可以介绍到一个极其重要的 Rust 机制：**自动引用和自动解引用**。任何方法在被使用的时候，Rust 都会自动的进行检测，同时进行自动的引用/解引用来保证参数同方法的签名一致。以 C++ 使用者的视角来看，对于变量指针指向的数据调用操作符 `->` 在 Rust 是不需要的，只要用 `.` 就可以了。当然了，如果你不喜欢，依旧可以使用 `(*pointer).data` 这样的形式来严谨的书写。

> 参考资料：https://doc.rust-lang.org/book/ch05-00-structs.html