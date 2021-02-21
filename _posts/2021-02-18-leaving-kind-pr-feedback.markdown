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

### We're working in a team environment with richer forms of communications than a PR
This post is assuming a team working on a project. Where there can be face to face meetungs, video calls, pairing, mobbing
or any other activity like this.

### PRs are often too late in the process for major changes.
For major changes we should try and pair, discuss or plan the issue before commiting time to a large code change.

### Most of the time it's better to move forward learn something then refactor
I like iterative development. Unless there's a major issue with the code or architecture I'd rather move forward, learn from it and apply 
some refactoring after.

### We're often more emotionally invested in our code that we'd like to admit
Once time has been spent on a change it's very hard to not be commited to it.

### PRs are a learning opportunity for the reviewer(s) too
I'll often ask questions to understand the code a little better. I treat this as a learning opportunity that *may* help with the review but
doesn't have to,

## How I review

The first thing I want to look for is potential security issues or major design flaws. If I find anything like this I'll want to flag the PR as one that needs work before it can be merged. Otherwise I'll consider the PR approved and ready for merge. 
