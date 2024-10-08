---
layout: post
published: false
title:  "Ladder of bug discovery joy"
date:   2024-10-08 10:00:00
categories: programming
summary: "The best and worst times to discover bugs"
icon: fas fa-swimming-pool
tags:
    - errors
    - types
    - testing
---


Higher up the ladder is better.

* Step 0: The bug exists, users are annoyed but work around it.
* Step 1: A user tells you about the bug
* Step 2: Automated logging/alarms tell you about the bug
* Step 3: A deploy is prevented by a liveness/readiness probe catching the bug
* Step 4: During automated integration tests
* Step 5: During automated unit tests
* Step 6: Whilst coding because of the type system
* Step 7: The bug can not exist in your code because of the design