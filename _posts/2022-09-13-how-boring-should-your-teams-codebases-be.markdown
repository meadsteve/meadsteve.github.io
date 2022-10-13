---
layout: post
published: false
title:  "How boring should your team's codebases be"
date:   2022-09-13 10:00:00
categories: team-work
summary: "Thoughts on how to keep the novelty in a team at the correct level for easy onboarding"
icon: fab fa-lightbulb
tags:
    - teams
    - experimentation
    - novelty
    - onboarding
    - complexity
---

Recently I was talking to friend about getting new people up and running in software teams. He mentioned some problems
a few new starters had had with an unfamiliar library they'd chosen in one project. This got me thinking about a pair 
of blog posts I'd read a number of years ago about [novelty budgets](https://shimweasel.com/2018/08/25/novelty-budgets) (
and [choose boring technology](https://mcfunley.com/choose-boring-technology)). These blog posts both use different 
language to talk about similar concepts "innovation tokens" and a "novelty budget".  The core idea is that you should 
limit the amount of "non-standard" solutions you use on a project. 

To me balancing this level of novelty is very important for a team. Whenever you bring someone new into the team they
have to get up to speed on all your existing code and technology choices. The more unusual these choices are the steeper
this learning curve will be.

## When to discuss the novelty? 
Most teams I've worked on have some process to make larger architectural decisions. This could be a larger discussion
on a PR for a proof of concept. Or maybe a more formal process for making `Architectural Decisions` that leads
to the creation of an [ADR](https://adr.github.io/).

This is a great point to discuss the impact the novelty of your choice will have on the team. But first lets discuss 
what it means to be novel and what things could be considered novel.
 
## What things can be novel?
There are many things that add to your teams novelty but I consider the following the major ones.

### The domain is (probably) always new
To a developer just starting working at your company there's a good chance they've never used your product before. 
It's possible they've never worked in your domain before or at least your specific niche in the domain. This means a 
lot of the terms and concepts you use will be something they need to learn as part of the onboarding.

### Is your language common yet?
If your company codes in Java or Python you will probably have no problem hiring a developer who already knows this 
language and won't have to add learning it to their onboarding tasks. If your entire company uses haskell there's a 
good chance you'll hire someone who's wiling to learn it but may not have already used it.

### Is that library common yet?
Developers might be familiar with language your team (and company) uses but if you use a brand new library or framework
this is another thing they will have to learn. This can be especially time consuming if it's a framework that relies on
a lot of convention rather than explicit code. Django for example can be very fast to develop in but if you're new to it
then you may need to spend a while reading the docs to really understand what's going on.

### Are the patterns common yet?


## Perspectives on novelty
### Team perspective - the new starter?
### Large companies internal transfer?


## Changes with time


## Too little novelty
