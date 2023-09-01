---
layout: post
published: false
title:  "Typed Python: Choose Sequence over List"
date:   2023-09-01 10:00:00
categories: programming
summary: "Why I would default to choosing sequence over list when adding types to a function"
icon: fab fa-python
tags:
    - python
    - mypy
    - types
---

## What am I talking about?
This will be a short post on why I try and default to writing:

```python
from typing import Sequence

def do_a_thing(items: Sequence[float]):
    ...
```

instead of 

```python
def do_a_thing(items: list[float]):
    ...
```

It's not a hard rule I'll follow. There are plenty of situations where list is fine (or even required) but 
defaulting to a sequence has the following benefits.

## Soft immutability (via a type checker)

Trying to type this code

```python
def calculate_sum_and_add_ten(items: Sequence[float]):
    items.append(10)
    return sum(items)
```

will result in an error from mypy (or your IDE or any other type checker.)

```
error: "Sequence[float]" has no attribute "append"  [attr-defined]
```

## Covariance

```python
def double_then_sum(items: list[float]):
    return sum(item * 2 for item in items)
    
my_integers: list[int] = [2, 4]
my_doubled_total = double_then_sum(my_integers)
```

gives the error:

```
error: Argument 1 to "double_then_sum" has incompatible type "list[int]"; expected "list[float]"  [arg-type]
note: "List" is invariant -- see https://mypy.readthedocs.io/en/stable/common_issues.html#variance
note: Consider using "Sequence" instead, which is covariant
```
