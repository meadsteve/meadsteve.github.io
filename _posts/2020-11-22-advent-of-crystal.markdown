---
layout: post
published: false
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

I've decided to do this year's advent of code in crystal lang.
In an attempt to make things more relaxed on the first day I spent
some time playing with the language and getting my environment 
setup.

https://crystal-lang.org/


## getting started
crystal spec - https://crystal-lang.org/reference/guides/testing.html

shard init

## Extras
ameba https://crystalshards.org/shards/github/crystal-ameba/ameba
## PRoblems
Whilst installing ameba

/usr/bin/shards build 
Dependencies are satisfied
Building: ameba
Error target ameba failed to compile:
/usr/bin/ld: cannot find -lyaml (this usually means you need to install the development package for libyaml)
collect2: error: ld returned 1 exit status
Error: execution of command failed with code: 1: `cc "${@}" -o /home/steve/code/crystal-playground/lib/ameba/bin/ameba  -rdynamic -L/usr/bin/../lib/crystal/lib -lyaml -lpcre -lm -lgc -lpthread /usr/share/crystal/src/ext/libcrystal.a -levent -lrt -ldl`

