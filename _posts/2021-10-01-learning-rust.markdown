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
### Immutable by default
I like being able to control where mutation happens so defaulting to immutable makes a lot of sense to me.

### Nice error messages
The compilers errors are generally very helpful. For example if I miss out a possiblity in a match expression:
```
error[E0004]: non-exhaustive patterns: `Equal` not covered
   --> src/main.rs:18:11
    |
18  |     match guess.cmp(&secret_number) {
    |           ^^^^^^^^^^^^^^^^^^^^^^^^^ pattern `Equal` not covered

```

## Result types combined with pattern matching

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
