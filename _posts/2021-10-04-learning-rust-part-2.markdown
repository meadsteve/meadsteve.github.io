---
layout: post
published: false
title:  "Learning rust - part 2"
date:   2021-10-04 10:00:00
categories: programming
summary: "The second part of my rust adventure"
icon: fab fa-rust
tags:
    - rust
    - languages
    - learning
---


## Painful

A search function
```rust
fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    contents
        .lines()
        .filter(|line| line.contains(query))
        .collect()
}
```

I wanted a case insensitive one. I thought this would work:

```rust
fn search_case_insensitive<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    let lowercase_contents = contents.to_lowercase();
    let lowercase_search = query.to_lowercase();
    search(&lowercase_search, &lowercase_contents)
}
```

but I got:

```
error[E0515]: cannot return value referencing local variable `lowercase_contents`
  --> src/lib.rs:45:5
   |
45 |     search(&lowercase_search, &lowercase_contents)
   |     ^^^^^^^^^^^^^^^^^^^^^^^^^^-------------------^
   |     |                         |
   |     |                         `lowercase_contents` is borrowed here
   |     returns a value referencing data owned by the current function

```