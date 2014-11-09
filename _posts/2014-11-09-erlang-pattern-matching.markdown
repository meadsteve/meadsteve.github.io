---
layout: post
title:  "Erlang pattern matching"
date:   2014-11-09 10:00:00
categories: programming
tags:
- learning
- new language
- erlang
- functional
- pattern matching
---

The book club at work picked [Programming Erlang](book-erlang) as the next book.
Handily enough this is also one of the languages I'll be studying as part of [Seven languages in seven weeks](book-7-languages).

## Pattern Matching - The price of things
One of the really cool features of erlang is pattern matching.
A good example of this is writing a module to calculate the price of shopping.
Starting very simply:

```erlang
-module(shop).
-export([cost/1]).

cost(oranges)   -> 5;
cost(newspaper) -> 8;
cost(apples)    -> 2;
cost(pears)     -> 9;
cost(milk)      -> 7.
```

This module exports a single function with a single argument.
The single function is made up a number of clauses (each separated with a semi-colon).
Each function definition takes what in erlang is called an atom (like a ruby symbol).
Any argument starting with a lower case letter is a symbol.
When this function is called erlang matches against definitions and executes the correct one.
So calling ```shop:cost(orange)``` would return 5.

## Extending to lists
Extending the previous example to something more useful consider a shopping list made up in following way:

```erlang
List = [{pears, 2}, {apples, 3}].
```

The square brackets in erlang define a list. The squirrely brackets are used to define a tuple.
In the absence of a fuller type system erlang atoms are often used to mark what a tuple represents.
So this list contains 2 pears and 3 apples.

A neat way of matching a list that erlang offers is the ability to match the head of a list and the tail(the rest of the list).
The syntax for doing this is simply ```[Head | Tail]```. You can also grab more than one element if you wanted ``` [First, Second | Tail]``` and so on.
So adding to the previous example:

```erlang
-module(shop).
-export([cost/1]).

cost(oranges)   -> 5;
cost(newspaper) -> 8;
cost(apples)    -> 2;
cost(pears)     -> 9;
cost(milk)      -> 7;

cost([{Item, Quantity} | RestOfList])
    -> (cost(Item) * Quantity) + cost(RestOfList);
cost([]) -> 0.
```
The really neat pattern matching happens when erlang sees the ```[{Item, Quantity} | RestOfList]```.
This path will be executed when erlang is given a list where the first element in the list is a tuple with two parts.
The value of Item and Quantity get bound to the values in the tuple. The value of RestOfList gets bound to everything
that remained in the list. We can then call the same function recursively to get the cost of all the rest of the list.
The only remaining thing is to tell erlang that the cost of an empty list is zero.


[repo-erlang-space]: https://github.com/meadsteve/ErlangSpace
[book-erlang]: http://www.amazon.co.uk/dp/B00I9GR4TW/ref=pe_385721_48721101_TE_M1T1DP
[book-7-languages]: http://shop.oreilly.com/product/9781934356593.do