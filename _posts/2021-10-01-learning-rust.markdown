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

Following https://doc.rust-lang.org/book

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
