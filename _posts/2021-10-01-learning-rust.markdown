---
layout: post
published: false
title:  "Learning rust"
date:   2021-10-01 10:00:00
categories: programming
summary: "What I learnt whilst spending some time to teach myself rust"
icon: fab fa-rust
tags:
    - rust
    - languages
    - learning
---

## What

Following ["the book"](https://doc.rust-lang.org/book) and using [clion](https://www.jetbrains.com/clion/) as an IDE.

## Delights

### Nice error messages
The compilers errors are generally very helpful. For example if I miss out a possiblity in a match expression:
```
error[E0004]: non-exhaustive patterns: `Equal` not covered
   --> src/main.rs:18:11
    |
18  |     match guess.cmp(&secret_number) {
    |           ^^^^^^^^^^^^^^^^^^^^^^^^^ pattern `Equal` not covered

```

### Immutable by default
I like being able to control where mutation happens so defaulting to immutable makes a lot of sense to me.

```rust
let s = String::from("hello");
s.push_str(" again");
```

will cause the compiler to raise the (very helpful) error:

```
error[E0596]: cannot borrow `s` as mutable, as it is not declared as mutable
 --> src/main.rs:4:5
  |
2 |     let s = String::from("hello");
  |         - help: consider changing this to be mutable: `mut s`
3 | 
4 |     s.push_str(" again");
  |     ^ cannot borrow as mutable
```

because I've tried to mutate something that was immutable.

### Result types combined with pattern matching

I've worked in the past with elixir/erlang so pattern matching was already something I was familiar with but I like how expresive this is:

```rust
let guess: u32 = match guess.trim().parse() {
    Ok(num) => num,
    Err(_) => continue,
 };
```

## Surprises
### Variable name shadowing
In other languages is something I would usually avoid but it appears early on in the tutorial.

```rust
let mut guess = String::new();

io::stdin()
    .read_line(&mut guess)
    .expect("Failed to read line");

let guess: u32 = guess.trim().parse().expect("Please type a number!");
```

### A semicolon between and expression and a statement

```rust
// This returns x + 1
fn plus_one(x: i32) -> i32 {
    x + 1
}

// vs

// this "implicitly returns `()` as its body has no tail or `return` expression"
fn plus_one(x: i32) -> i32 {
    x + 1;
}
```

In the case of the later though the compiler does return a very helpful error message:

```
error[E0308]: mismatched types
 --> src/main.rs:7:24
  |
7 | fn plus_one(x: i32) -> i32 {
  |    --------            ^^^ expected `i32`, found `()`
  |    |
  |    implicitly returns `()` as its body has no tail or `return` expression
8 |     x + 1;
  |          - help: consider removing this semicolon

error: aborting due to previous error

For more information about this error, try `rustc --explain E0308`.
error: could not compile `functions`

To learn more, run the command again with --verbose.
```

### Memory safety variable invalidation

Attempting to compile the following code will raise `error[E0382]: borrow of moved value: `s1``

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1 stops being valid after this point

    println!("s1:{} s2:{}", s1, s2);
}
```
