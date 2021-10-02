---
layout: post
published: true
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

As a challenge between contracts (I'm currently a consultant) I've decided to learn rust.
I've been following ["the book"](https://doc.rust-lang.org/book) and using [clion](https://www.jetbrains.com/clion/) 
as an IDE. Whilst learning the language I've been writing this blog post about things I've either
found interesting or a little difficult.

## Delights

Here are the things I really enjoyed from my first day of rust.

### Nice error messages
The compiler's errors are generally very helpful. For example if I miss out a possibility in a match expression:
```
error[E0004]: non-exhaustive patterns: `Equal` not covered
   --> src/main.rs:18:11
    |
18  |     match guess.cmp(&secret_number) {
    |           ^^^^^^^^^^^^^^^^^^^^^^^^^ pattern `Equal` not covered

```

### Immutable by default
I like being able to control where mutation happens so defaulting to immutable makes a 
lot of sense to me.

If I create a string and then try and mutate it like this

```rust
let s = String::from("hello");
s.push_str(" again");
```

then the compiler will raise the following (very helpful) error:

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

because I've tried to mutate something that was immutable. It provides a solution if I
want to make it mutable but it has to be done thoughtfully.

This also includes function arguments that are references so the following code will also
error because I try and mutate a reference:

```rust
fn add_woop(s: &String) {
    s.push_str("woop")
}
```

instead, it would need to be:

```rust
fn add_woop(s: &mut String) {
    s.push_str("woop")
}
```

### Result types combined with pattern matching

I've worked in the past with elixir/erlang so pattern matching was already something I was 
familiar with, I like how expressive this is:

```rust
let guess: u32 = match guess.trim().parse() {
    Ok(num) => num,
    Err(_) => continue,
 };
```

## Surprises

Following on from the delights I also found a few things either chalenging or at least
surprising on my first day.

### Variable name shadowing
In other languages re-using a variable name is something I would usually avoid, but for rust
variable shadowing appears early on in the tutorial.

```rust
let mut guess = String::new();

io::stdin()
    .read_line(&mut guess)
    .expect("Failed to read line");

let guess: u32 = guess.trim().parse().expect("Please type a number!");
```

My worry here is that I will accidentally change something rather than doing it on purpose.

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

## Delightful surprises

I'm really enjoying the way rust deals with memory management.
There's something I want to try and write about ownership and borrowing.
I've not thought about how to express it yet though, so I'll save this for another post.