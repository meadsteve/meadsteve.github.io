---
layout: post
title:  "Advent of Crystal(lang)"
date:   2020-03-04 10:00:00
categories: programming
summary: "Getting ready for advent of code in crystal lang"
icon: fas fa-gem
tags:
    - crystal lang
    - advent of code
    - new language
---

I've decided to do this year's [advent of code][website-advent] in [crystal lang][website-crystal].
In an attempt to make things more relaxed on the first day I spent
some time playing with the language and getting my environment 
setup.


## Getting started
The language install, following the docs, went fairly smoothly. I found a plugin for intelij so I'll be using this as my IDE as it's
what I use for most things. I generally expect newer languages to ship with a testing tool. Crystal was no exception here.
It comes with a tool called [spec][crystal-spec] that I got running without any real challenges.


## Extra static checking
Since this is a new language for me I thought I'd investigate what libraries are often used. I saw a tool called [ameba][crystal-ameba] which describes itself as:
> Ameba is a static code analysis tool for the Crystal language. It enforces a consistent Crystal code style, also catches code smells and wrong code constructions.

This sounded great to me as I'm not really sure what I'll be doing so having something helping me write correct code is going to help.

### Getitng it installed
Crystal came with a dependency manager called shard. Running `shard init` was enough to get my project ready. Then I added ameba to my `shard.yml` and ran `shard install`. Here I ran in to my first error:

```
/usr/bin/shards build 
Dependencies are satisfied
Building: ameba
Error target ameba failed to compile:
/usr/bin/ld: cannot find -lyaml (this usually means you need to install the development package for libyaml)
collect2: error: ld returned 1 exit status
Error: execution of command failed with code: 1: `cc "${@}" -o /home/steve/code/crystal-playground/lib/ameba/bin/ameba  -rdynamic -L/usr/bin/../lib/crystal/lib -lyaml -lpcre -lm -lgc -lpthread /usr/share/crystal/src/ext/libcrystal.a -levent -lrt -ldl`
```

Luckily the error was descriptive enough mentioning that I might need to instll the dev pacakge for libyaml. I did this and I was back up and running.


## Am I ready?

I've got the language compiler, tests and static analysis running. My IDE is doing some syntax highlighting. So I can do something. Whether that something is useful we'll find out on December 1st.

[website-advent]: https://adventofcode.com/
[website-crystal]: https://crystal-lang.org/
[crystal-spec]: https://crystal-lang.org/reference/guides/testing.html
[crystal-ameba]: https://crystalshards.org/shards/github/crystal-ameba/ameba
