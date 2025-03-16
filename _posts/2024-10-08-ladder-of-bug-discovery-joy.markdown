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
can alert you in minutes. The user report possibly took hours or days to reach you. The sooner you learn the sooner
you can fix. Maybe you notice so quickly you roll back before many users even encounter the bug.

### Step 3 - A deploy is prevented by a liveness/readiness probe catching the bug
In this step I'm imaging there's some automated precondition that stops a change going live.
This is the first step where a user didn't find the bug. Which is great. The downside of finding it this 
late is that it's probably blocking your deploy pipeline so your team needs to switch focus to fix or undo
the bug before normal work can continue.

### Step 4 - During manual testing behind a feature flag/dark launch/whatever
I really like feature flags. Being able to get code into production quickly because it's behind a feature flag
is great. No users will see the bug. No deploy pipelines got blocked. It's a slightly slower feedback loop
than steps higher up on the ladder and required manual testing effort. That said we're in a pretty good place if
most of our bugs are stopped here.

### Step 5 - During slower automated tests (Integration tests perhaps)
I'm lumping all tests that take minutes to run into this step. Catching bugs here is pretty good. All the
benefits from step 4: No users impacted, no pipelines blocked. In addition: no manual effort was spent. The downside
is I've potentially had to wait a long time for this result. Maybe I wandered off to have a drink and a snack whilst 
this was happening. All this contributes to me forgetting the context I was working in.

### Step 6 - During fast automated tests (Unit tests or anything else fast)
I love having unit tests running continuously as I'm working. Ideally if the language supports it I have tests
running as I'm typing (special mention of https://wallabyjs.com/ for enabling this continuous testing in javascript).
The real strength here is discovering the bug/edge-case whilst actively thinking about the code. I've not 
had to wait any significant amount of time between creating some code and learning about its consequences. My flow
is unbroken.

### Step 7 - Whilst coding because of the type system
An example of what I mean by this step could be having a function that accepts an `int`. In most languages
I'll get an error if I try and pass a `float` to the function. The type system has now potentially prevented a bug
caused by data loss. In a lot of ways this is very similar to step 6. The main advantage is that there's no test
to maintain so no overhead.

### Step ∞ - The bug can not exist in your code because of the design
Largely a continuation of step 7 but in this case I don't encounter the bug in the first place. To give
an example: imagine you're representing a set of choices a user can make. Let's say in our example domain 
that the user must always have at least 1 choice. In most languages we could model this as a list of strings.
We could make sure we're diligent about testing then mostly we could catch bugs by step 4. However, if we instead
modelled this as a new type with a constructor that takes "1 or more choices" then we can never create an invalid
list to begin with.

In some "go inspired pseudocode" it could look like this:

```go
type UserChoices []string

func New(firstChoice string, extraChoices ...string) UserChoices {
	// Construct the object somehow
}

// Usage

New("up")
New("up", "down", "left", "right")
```

The design gives no method for constructing an empty list, so we can be more confident that it won't sneak
into the code somehow. This can help reduce the amount of tests we have to write. It's worth noting though
that getting to this kind of design is harder in some languages than others, so it may not always be appropriate.
Don't fight your language.


## In conclusion

Do all you can to set up systems that help you climb the ladder. No system is going to be perfect.
Make sure you have layers. Maybe you slip a little and miss some bugs on step 6, but you make good use of feature 
flags, and you find your footing on step 4. 