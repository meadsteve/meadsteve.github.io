---
layout: post
published: true
title:  "Nested 'red, green, refactor'"
date:   2021-11-06 10:00:00
categories: programming
summary: "Using compiler driven development as an inner red, green refactor loop."
icon: fab fa-rust
tags:
    - rust
    - tdd
    - languages
    - learning
    - compiler
    - cdd
    - compiler driven development
---

## Red, green, refactor ?

When writing code I generally like to use TDD and follow: "red, green, refactor".

* Red - I write a failing test (it's shown as red for most IDEs) for the new behaviour/feature I want.
* Green - I write code until the test passes (it turns green in my IDE)
* Refactor - I improve the code I've written whilst keeping the test green.

And then I loop over this process whilst adding behaviours to the code.


## Nested ?
Recently I've been learning [rust]({% post_url 2021-10-01-learning-rust %}) and writing some 
[elmlang](https://elm-lang.org/) at work. Both of these languages have a decent type system and a focus
on providing friendly error messages from the compiler. I've started to find myself doing  the following once 
I've written my failing test:

* I write code that I think will make the test pass. The compiler helpfully points out that it's wrong and marks my mistakes in red.
* I follow the compiler's recommendations until I have some code that compiles.
* I improve the code I've written keeping the compiler "happy".

Once I've done this I go back to my test and check that it's green too. I'm then back to following my TDD
red, green, refactor at the test level. 

![diagram showing nested red, green, refactor loops](/images/2021-11-06-nested-red-green-refactor/diagram.svg)

## Do I still need the TDD part?

In my view: yes. Both levels of this loop bring value to me. The compiler driven loop really helps 
me where I've tried to do something impossible with my input types or where I've not handled an error
condition that I should (this is especially true in rust - it has no exceptions so errors must be handled).

However, the compiler can't tell me if my functions actually do what I intended to them to do. The 
following example code would be "green" in my compiler driven loop, the types are all good:

```rust
pub fn add(a: i32, b: i32) -> i32 {
    a - b
}
```

but the mistake in the above is easily revealed by the following test:

```rust
// Left:  -1
// Right: 3
// <Click to see difference>
// 
// thread 'day_05::replacer::tests::test_add' panicked 
// at 'assertion failed: `(left == right)`
//   left: `-1`,
//  right: `3`', src/day_05/replacer.rs:74:9
#[test]
fn test_add() {
    assert_eq!(add(1, 2), 3)
}
```

I also really value TDD for helping me design better interfaces for my functions. If
I start with a test case I'm much less likely to write:

```rust
#[test]
fn test_add() {
    let adder = Adder::new();
    adder.set_first(2);
    adder.set_second(3);
    adder.calculate()
    let result = adder.extract_result();
    assert_eq!(result, 3)
}
```

Using the TDD level of the loop makes me the first consumer of my API. I find out straight away
if the code is easy to use.

There are tests I would skip in more statically & strongly typed languages. One example of this is negative numbers.
In a language (like python for example) where it's not possible to, easily, express the type "positive integer" I would
be adding tests around negative numbers. In rust I wouldn't need it as the following doesn't compile:

```rust
fn main() {
    let oops = -1;
    //  ^^ the trait `std::ops::Neg` is not implemented for `u32`
    print_a_non_negative_number(oops);
}

fn print_a_non_negative_number(a: u32) {
    println!("{}", a)
}
```

I've really been enjoying the extra level of immediate feedback a compiler with friendly error messages provides, and
I look forward to doing more compiler driven development.