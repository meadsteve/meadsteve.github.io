---
layout: post
published: true
title:  "How boring should your team's codebases be"
date:   2022-10-13 10:00:00
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
of blog posts I'd read a number of years ago about [novelty budgets](https://shimweasel.com/2018/08/25/novelty-budgets) 
and [choosing boring technology](https://mcfunley.com/choose-boring-technology). These blog posts both use different 
language to talk about similar concepts: "a novelty budget" and "innovation tokens". The core idea is that you should 
limit the amount of "non-standard" solutions you use on a project. 

To me balancing this level of novelty is very important for a team. Whenever you bring someone new into the team they
have to get up to speed on all your existing code and technology choices. The more unusual these choices are the steeper
(and/or longer) this learning curve will be.

## When to discuss the novelty? 
Most teams I've worked on have some process to make larger architectural decisions. This could be a larger discussion
on a PR for a proof of concept. Or maybe a more formal process for making "Architectural Decisions" that leads
to the creation of an [ADR](https://adr.github.io/).

This is a great point to discuss the impact the novelty of your choice will have on the team. Let's start by covering 
what it means to be novel and what things could be considered novel.
 
## What things can be novel?
There are many things that add to your teams novelty but I consider the following the major ones.

### The domain is (probably) always new
To a developer just starting working at your company there's a good chance they've never used your product before. 
It's possible they've never worked in your industry before or at least your specific niche in the industry. This means a 
lot of the terms and concepts you use will be something they need to learn as part of the onboarding.

### Is your language common yet?
If your company codes in java or python you will probably have no problem hiring a developer who already knows this 
language. They won't have to add learning it to their onboarding tasks. If your entire company uses haskell there's a 
good chance you'll hire someone who's wiling (and maybe excited) to learn haskell but has never worked with it before.

### Is that library/framework common yet?
Developers might be familiar with language your team (and company) uses but if you use a brand new library or framework
this is another thing they will have to learn. This can be especially time consuming if it's a framework that relies on
a lot of convention rather than explicit code. Django for example can be very fast to develop in but if you're new to it
then you may need to spend a while reading the docs to really understand what's going on.

### A special mention - Not using a framework
If there's a handful of common frameworks for your language and you chose **not** to use one then I would consider
this a novel choice. There's a good chance you'll end up creating an ["ad hoc and informally-specified
implementation of a framework"](https://en.wikipedia.org/wiki/Greenspun%27s_tenth_rule). This will be new to any developer you hire as it only exists within your team or company.

### Are the patterns common yet?
For example is functional programming popular in your language of choice? Has it always been popular or is it 
"the new thing". This potentially adds another set of concepts your new developer has to learn.

### Platforms, Databases, etc...
Is your database or data storage widely used? What executes your code? Is it a docker container? Serverless? Deployed
to kubernetes? All of these may be technology that your new starter needs to learn.

## Perspectives on novelty
Obviously not all new starters to your team are the same. Different people have taken different career paths and arrive
in your team with a unique set of skills and perspectives. There are however trends. There might be languages and 
frameworks that are more popular and common in your specific industry or specialism. Javascript for the web is not novel. 
Javascript for a device driver would be an interestingly novel choice.

### Large companies internal transfer?
Once a company is above a certain size then considering people moving internally becomes a factor. Erlang as a 
language choice might be considered novel if the rest of your company writes in java. But if your entire company uses
erlang already then it's almost the default language choice and you would have to justify using something else.

## Changes with time
Technology moves on. What was once new, exciting and unstable becomes common, stable and well known. A few years ago
using typescript would be considered a novel choice. Now I would argue that typescript is a standard choice. So if your
team was on the cutting edge and spent some of its novelty budget on typescript at the start of a project that budget is 
now available again today to invest in something else. Some technology choices never become mainstream and will always
use up some of your novelty budget. Other choices might have started out as a common choice but become more niche with 
time. COBOL as a programming language is a good example of this. It was very mainstream in the 60s. However now finding 
developers that won't find COBOL novel is becoming harder every year.

## Too little novelty
None of the things listed above are bad in isolation. They may bring a number of benefits:

* The new thing may be a better tool for solving your problem. It may help express your domain logic more cleanly.
* It may result in less bugs and improved development time.
* It may offer better performance.
* The codebase might become smaller and easier to maintain.
* It can be exciting and motivating as part of your team member's personal development to learn new skills & technology.

To me the important thing is to be conscious of the total novelty your team owns. If your team has very little novelty
perhaps you could consider writing the next proof of concept using a new technology. If you find have a lot of novelty 
maybe it's time to rewrite that old proof of concept that got pushed into production.

This is not a static thing. Make novelty one of the factors you consider every time you make an architectural decision 
and hopefully you'll  find you have an easier time bringing in new people to your team.

