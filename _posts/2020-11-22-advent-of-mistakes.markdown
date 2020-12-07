---
layout: post
title:  "Advent of Mistakes"
date:   2020-03-04 10:00:00
categories: programming
summary: "The mistakes I've made during this year's advent of code whilst learning crystal"
icon: fas fa-gem
tags:
    - crystal lang
    - advent of code
    - new language
    - mistakes
---

For this year's advent of code I decided to try a new language: [crystal](./2020-11-22-advent-of-crystal.markdown).
I wanted to write about the challenges I've faced writing in a language new to me.

## Frustrating bugs

Here are some of the mistakes I made (often more than once) whilst working with this new language.

### assignment (=) when I meant equality check (==)
I had a block of code like this:
```crystal
  if char == 'F'
    row_range = row_range.lower_half
  elsif char = 'B'
    row_range = row_range.upper_half
  elsif char = 'L'
    col_range = col_range.lower_half
  elsif char = 'R'
    col_range = col_range.upper_half
  end
 ```
It took me a longer than I'd care to admit that the second `if` was mutating the value of `char`. I'd love to have some immutability in the language here 
to help me not fall into this trap. Maybe it has that? Maybe it has some patterns 

### Forgetting constructors are .new

My current day job is writing python where constructing a new class looks like this `MyNewClass(data)`. In crystal it's `MyNewClass.new(data)`. It's 
taking my muscle memory a while to learn this. In addition `MyNewClass(data)` can mean something in crystal but it's not construction of a new object.

### Overriding a method in the same class :facepalm:

I wrote code like this (I've abridged for clarity):

```crystal
  class ThingDoer
    def my_very_important_thing
       false
    end
    
    def my_very_important_thing
       true
    end
  end
 ```
 
 I did not realise it was possible for a function to be overwritten in the same definition of a class. Took me a while to spot this silly mistake. I wonder
 what the use case for this is.

### `'` for chars and `"` for strings

I was iterating over `"some_string".chars` and I wondered why this if statement was never true `char == "F"`. The `.chars` function returns charecters as an
enumerable which means I needed to compare it to `'F'` which is the charecter F not `"F"` which is a string made up of a single F.

## Non-idomatic Code

The harder thing is the feeling that the code I'm writing is clumsy and not embracing the language yet. I think the solution
here would be spending more time reading Crystal (and probably) ruby code.
