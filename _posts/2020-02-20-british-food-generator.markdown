---
layout: post
published: false
title:  "How the British Food Generator works"
date:   2020-02-27 10:00:00
categories: programming
summary: "Introduction and explanation to the components that make up the british food generator"
icon: fas fa-utensils
tags:
    - python
    - ridiculous
    - delicious
    - api
    - markov
    - britain
    - food
---

Around a year ago a conversation at work made me realise that traditional british 
food names are a little bit strange. This lead me to create the [British food generator][website-food-gen].
In this post I want to introduce a few of the pieces of code that power the
British Food generator.

## Names

The name generation is fairly simplistic. I took a bunch of traditional food names and
split them into pieces. These pieces are then recombined randomly.

![image of name components](/images/2020-02-20-british-food-generator/food_names.png)

## Description
Uses a [markov chain][wiki-markov] built on top of descriptions of British food.
Using [markovify][library-markovify] set of sample sentences are generated then the sentences are
scored based on whether they mention words in the food's name.

## Image
The selection of food images (from wikipedia) are filtered to pick images 
that contain at least one of the words from the description or name. If this 
isn't possible then a purely random one is selected.


[website-food-gen]: https://british-food-generator.herokuapp.com
[wiki-markov]: https://en.wikipedia.org/wiki/Markov_chain
[library-markovify]:https://github.com/jsvine/markovify
