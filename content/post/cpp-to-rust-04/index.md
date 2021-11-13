+++
author = "Zhou Fang"
title = "由 C++ 入门 Rust 04（切片）"
date = 2021-09-13T16:54:40+09:00
updated = "2021-09-13"
category = "开发手札"
tags = [
    "Rust",
    "C++"
]
+++

# 前言
在上一篇文章中，我们已经可以认识到 Rust 对于资源所有权的设计非常的独特，但是在实际使用中，对于很多数据，我们需要的仅仅是其中一小段，或是一个。为了很小的需求而获取了完整的资源所有权，这不免有些小题大做了。Rust 对于这类情况，导入了切片概念。一起来了解一下吧~

# 切片
切片，我第一次接触到是在 Go 语言之中，不同于复制数组重新构成一个对象或是结构体，切片是在内存上进行操作的。简单来说，切片可以在一份数据保存在内存上的情况下，提供了不同范围的访问。因此，切片是非常高效的一种数据使用方法。

但是由于是同一份数据，切片对应的内存上如果数据被清除，创造出的切片自然也无法继续存续了。Rust 提供了极佳的所有权机制，在所有权机制下，这个现象理解起来相比于别的语言学习者，想必是非常轻松的。

下面我们就来通过代码一探究竟。

## 代码 1
```rust
fn main() {
    let mut s = String::from("hello world");
    let word = first_word(&s);
    println!(word); // 5
    println!(s); // "hello world"
    s.clear();
    println!(s); // ""
}

fn first_word(s: &String) -> usize {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return i;
        }
    }

    s.len()
}
```

代码 1 中，我们设计了一个函数 `first_word` 用于计算给定字符串中，第一个单词的长度。`as_bytes() -> &[u8]` 函数提供了字符串的低层数组。`iter()` 会产生一个类似 C++ 中的迭代器，而 `enumerate()` 提供了类似于 Python 中的 `(index, data)`格式的返回。通过比对当前字符是否为空格，返回单词长度。如果到了最后都没有找到空格，那么意味着整个字符串为一个单词，返回字符串的长度即可。

这段代码是没有任何问题的。但是存在一个逻辑上的问题，我们知道了 `hello world` 这个字符串中的第一个单词长度为 5 并放置在了 `word` 变量中，但是我们清空了这个字符串，`word` 就没有作用了，我们能不能返回出一个字符串呢？

这个时候，使用切片就会显得非常方便，对于任意字符串 `s` 有如下写法：

```rust
let str0 = &s[..];
let str1 = &s[0..2];
let str2 = &s[2..3];
let str3 = &s[2..=3];
```

> 注：这里字符串对象 `String` 的切片是栈上的 `&str` 形式。
> 顺带一提，常规的字符串其实就是 `&str` 格式保存的。

在其他语言进行范围指定的时候，我们见过非常多次了，一般默认都是左闭右开的，即`[start, end)` 但这样有时候会显得不直观，比如要从 1 数到 100, 得写 `1..101`, Rust 提供了更加直观的 `..=` 写法，只要写作 `1..=100` ，可读性大大增强。

改写一下函数，我们得到了下面的代码。

## 代码 2
```rust
fn main() {
    let mut s = String::from("hello world");
    let word = first_word(&s);
    println!("{}", word);
    println!("{}", s);
}

fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[..i];
        }
    }

    s
}
```

代码 2 中，在改写之后，`word` 变量获取到了第一个单词。一切看上去很妙，我们在 `main` 函数上稍作改动，再来看看。

## 代码 3
```rust
fn main() {
    let mut s = String::from("hello world");
    let word = first_word(&s);
    s.clear(); // 编译无法通过
    println!("{}", word);
    println!("{}", s);
}

fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[..i];
        }
    }

    s
}
```

锵锵，这里就会发生编译不通过的问题了，报错为 `mutable borrow occurs here`。原因就在于 `word` 究其根本还是一个切片，是**借用**了 `s` 的一部分数据做成的。如果变了 `s`, `word` 就无法获取到底层数据了。

在 Rust 代码中，如果后面依旧要使用 `word` 这个切片，那么 `s` 是不能被修改的，只有在 `word` 最后一次访问之后的代码中才能对 `s` 进行修改。这个检查将会由 Rust Language Server 完成。

# 总结
切片是非常方便的数据使用方式，在 Rust 中，对于所有权系统是一个简单的绕过，但是依旧内存安全的手法。

> 参考资料：https://doc.rust-lang.org/book/ch04-03-slices.html