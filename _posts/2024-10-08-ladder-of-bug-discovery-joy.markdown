---
layout: post
published: false
title:  "Ladder of bug discovery joy"
date:   2025-03-16 10:00:00
categories: programming
summary: "The best and worst times to discover bugs"
icon: fas fa-swimming-pool
tags:
    - errors
    - types
    - testing
---

This post is mostly a brain dump on when I'm happiest on finding bugs in software I work on.
I decided to structure it as a ladder. Higher up the ladder is better.

## The Steps

### Step 0 - The bug exists, you never learn about it 
Users are annoyed but work around it. We've all worked with software that has some weird behaviour.
Maybe that behaviour isn't annoying enough for you to contact anyone. Maybe you did report it somewhere, but
it never made it to the correct dev team. The bug contributes to a little less joy in using the software.
Too many of this kind of bug and users will move away from your software to an alternative (if they can).

### Step 1 - A user tells you about the bug
Something was annoyingly broken and a user managed to let you know about it.
Since it made it all the way to the user you've already annoyed a few people. Maybe lost a little reputation, 
maybe a little business. Mistakes will happen occasionally, but it's not good if this happens often.

### Step 2 - Automated logging/alarms/graphs tell you about the bug
In a lot of ways this is similar to the step above. The main difference is speed. Whatever automated thing you have
can alert you in minutes. The user reports possibly took hours or days to reach you. The sooner you learn the sooner
you can fix. Maybe you notice so quickly you roll back before many users even encounter the bug.

### Step 3 - A deploy is prevented by a liveness/readiness probe catching the bug
In this step I'm imaging there's some automated precondition that stops a change going live.
This is the first step where a user didn't find the bug. Which is great. The downside of finding it this 
late is that it's probably blocking your deploy pipeline

### Step 4 - During manual testing behind a feature flag/dark launch/whatever

### Step 5 - During slower automated tests (Integration tests perhaps)

### Step 6 - During fast automated tests (Unit tests or anything else fast)

TODO: mention wallaby

### Step 7 - Whilst coding because of the type system

### Step ∞ - The bug can not exist in your code because of the design
