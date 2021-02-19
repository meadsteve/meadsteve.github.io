---
layout: post
title: "Leaving kind (and productive) PR feedback"
date:  2021-02-19 10:00:00
categories: team-work
summary: "How I'm trying to leave more consructive, useufl and kind feedback"
icon: fas fa-thumbs-up
published: false
tags:
    - productivity
    - team-work
    - collaboration
    - PR
    - Review
---

I started thinking about this because of this tweet:

{% include tweet.html 
    username="imosquera" 
    text="I hear a lot about how PRs feedback can be taken personally  and be emotionally painful. What are some of the guidelines your team follows to avoid this from happen?" 
    link="https://twitter.com/imosquera/status/1361703634115813376" 
%}

## Assumptions
Before I get to my answer to how to leave more constructive feedback I'm going to state some assumptions I've made.

### PRs are often too late in the process for major changes.
### Most of the time it's better to move forward learn something then refactor
### We're often more emotionally invested in our code that we'd like to admit 
### PRs are a learning opportunity for the reviewer(s) too

## How I review

The first thing I want to look for is potential security issues or major design flaws. If I find anything like this I'll want to flag the PR as one that needs work before it can be merged. Otherwise I'll consider the PR approved and ready for merge. 
