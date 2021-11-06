---
layout: post
published: false
title:  "Nested 'red, green, refactor'"
date:   2021-11-06 10:00:00
categories: programming
summary: "The second part of my rust adventure"
icon: fab fa-rust
tags:
    - rust
    - tdd
    - languages
    - learning
    - compiler
    - cdd
---

## Red, green, refactor ?

When writing code I generally like to use TDD and follow: "red, green, refactor".

* Red - I write a failing test (it's shown as red for most IDEs) for the new behaviour/feature I want.
* Green - I write code until the test passes (it turns green in my IDE)
* Refactor - I improve the code I've written whilst keeping the test green.

And then I loop over this process whilst adding behaviours to the code.


## Nested ?
Recently I've been learning [rust]({% post_url 2021-10-01-learning-rust %}) and I've found myself doing 
the following once I've written my failing test.

* I write code that I think will make the test pass. The compiler helpfully points out that it's wrong and marks my mistakes in red.
* I follow the rust compiler's recommendations until I have some code that compiles.
* I improve the code I've written keeping the compiler "happy".

Once I've done this I go back to my test and check that it's green too. I'm then back to following my TDD
red, green, refactor at the test level. 

![diagram showing nested red, green, refactor loops](/images/2021-11-06-nested-red-green-refactor/diagram.svg)

## Do I still need the TDD part?

TODO: write me

bugs. cases not handled.
Off by one errors