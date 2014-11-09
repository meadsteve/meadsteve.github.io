---
layout: post
title:  "Achievement unlocked: programming in Io"
date:   2014-11-05 10:00:00
categories: programming
tags:
- learning
- new language
- coding
- Io
- prototype based
---

## Why Io?
I've been reading through a new book called [Seven languages in seven weeks][book-7-languages].
Its goal is to try and give the reader a flavour of a number of different languages.
The languages have been selected to try and cover a range of paradigms and features.
Given that the book covers seven languages it doesn't (and can't) cover the language in detail
but the author has tried to focus on what makes that language interesting.

The first chapter was ruby. I'm now on the second chapter covering a language called [Io][website-io-language].

## Clone all the things!

Io is a prototype based OO language (much like javascript). Everything is an object.
In fact everything is a clone of an object. Take the following snippit:

``` Io
Duck := Object clone
Duck quack := method("quack like a duck!" print)
```

Duck is now an object with ```Object``` as its prototype. All objects have slots and we've set the quack slot on the duck. In fact we've set it to contain another object called method. Any object starting with a capital letter is a type. Anything starting with a lowercase letter is an instance of a type so the following would happen in Io's console:

``` console
Io> Duck type
==> Duck

Io> bobby := Duck clone
==>...
Io> bobby type
==> Duck

```

This is about as far as I've got with the language so far. There are some interesting ideas to think about.
The complete lack of any syntactic sugar is a little overwhelming but I'm looking forward to diving in to Io a bit more.

[book-7-languages]: http://shop.oreilly.com/product/9781934356593.do
[website-io-language]: http://iolanguage.org/
