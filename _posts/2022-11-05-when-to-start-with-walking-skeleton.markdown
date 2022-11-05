---
layout: post
published: false
title:  "When to start with a walking skeleton"
date:   2022-11-05 10:00:00
categories: programming
summary: "How I decided if I should start by getting a project building and deploying or if a should hack"
icon: fas fa-skull
tags:
    - software
    - walking skeleton
    - prototype
---

## What is a walking skeleton?
From the book [Growing Object-Oriented Software, Guided by Tests](https://www.oreilly.com/library/view/growing-object-oriented-software/9780321574442/):

> A “walking skeleton” is an implementation of the thinnest possible slice of real functionality that we can automatically build, deploy, and test end-to-end

## So when would I *not* use this? 
If I don't even know that I'll need a web service/whatever I don't worry about a walking skeleton. I hack together anything that takes input and gives output and
helps me explore a concept. That way I don't waste time with infrastructure that I might not need. In other words when
I'm definitely treating the code as a prototype (not aiming for an MVP). If I'm planning on throwing the code away.


## When do I start with a skeleton?
If I know I'm definitely going to be deploying an API of some kind then I start with getting a walking skeleton for that 
kind of API up and running. That way I know I'll always be able to deploy my work.
