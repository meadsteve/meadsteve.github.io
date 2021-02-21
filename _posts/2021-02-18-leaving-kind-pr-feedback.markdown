---
layout: post
title: "Leaving kind (and productive) PR feedback"
date:  2021-02-21 10:00:00
categories: team-work
summary: "How I'm trying to leave more constructive, useful and kind feedback"
icon: fas fa-thumbs-up
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
Before I start discussing how I try to leave more constructive feedback I'm going to state some assumptions I've made.

### Testing and linting is automated
Humans make lousy proofreaders compared to a machine. I'm assuming issues of styling and obvious bugs don't require a comment.

### We're working in a team environment with richer forms of communication than a PR
This post assumes a team working on a project. Where there can be face to face meetings, video calls, pairing, mobbing
or any other activity like this. For open source a lot of what I'm going to write doesn't really apply as async PRs are the main way of communicating.

### PRs are often too late in the process for major changes.
For major changes we should try to pair, discuss or plan the issue before committing time to a large code change.

### Most of the time it's better to move forward, learn something, then refactor
I like iterative development. Unless there's a major issue with the code or architecture I'd rather move forward, learn from it and apply 
some refactoring after.

### We're often more emotionally invested in our code that we'd like to admit
Once time has been spent on a change it's very hard to not be committed to it.

### PRs are a learning opportunity for the reviewer(s) too
I'll often ask questions to understand the code a little better. I treat this as a learning opportunity that *may* help with the review but
doesn't have to,

## How I review

### First Pass
The first thing I want to look for is potential security issues, major design flaws or bugs. If I find anything like this I'll want to flag the PR as one that needs work before it can be merged. Next I'll look for areas I don't really understand. These are good places for me to ask questions. This might be because I'm unfamiliar with the area of the code. In which case it's a good place for me to learn. Other times it's because something about how we're changing the code is unclear. This can often highlight the need for some documentation or maybe some changes in the code to make it more self documenting. 

### Second pass
If there were no major problems or areas I didn't understand from my first pass I'll consider the PR approved and ready for merge. Now I'll look through the code for oppurtunities for improvements. I don't think it's productive to comment on every line of a PR so after going over the whole PR I'll pick a few areas I've found that would have the biggest impact on code quality. This is where I leave my feedback, preferably in the form of concrete suggestions. I try and make it clear that these are suggestions.

#### An exception to the above for RFC(Request For Comments) style PRs
A lot of teams I've worked in have a pattern where some more experimental changes will be made with a small spike implementation. This acts as a concrete example to base discussion around. In these cases I will provide a lot more feedback as this is the whole purpose of the PR.

## What if we keep finding large bugs, or areas that need discussing
My preference is for the "light touch PRs" I described in my second pass. If we find that we're often having complex discussions around how a PR should look or a lot of bugs are being highlighted then this is a sign to me that some part of our earlier process is not right. Normally the best way to deal with this is examining the kinds of problems in a retrospective. The underlying cause is often some combination of the following:

  * We're missing some test coverage or scaffolding so bugs aren't caught automatically.
  * There's a lack of shared understanding in the team around an area in the code.
  * There's a disagreement in the team about the best way of solving a problem
  * The design goals for the project are unclear or implict and undocumented.

## Do I always follow this?

No. Not strictly. Each team, situation and contributor is different and I'll try and adapt to that. Sometime I'll do more written feedback in a PR, sometimes I'll do more outside a PR. Sometimes I just get it wrong. What I've described is my ideal and my starting point.
