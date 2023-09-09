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
    - sequences
    - collections
    - covariance
    - contravariance
---

## What am I talking about?
This will be a short post on why I try and default to writing the following:

```python
from typing import Sequence

def do_a_thing(items: Sequence[float]):
    ...
```

instead of writing:

```python
def do_a_thing(items: list[float]):
    ...
```

It's not a hard rule. There are plenty of situations where list is fine (or even required) but 
defaulting to a sequence has a number of benefits. 

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

This means I won't accidentally mutate a list I pass in to the function. If I expect the function to mutate
the list then I can communicate this fact by altering the typehint to a list. This helps communicate the intent
of the function more clearly.

## Covariance

Most of the time an `int` can be treated as a `float`. Your code will treat `5` as effectively being `5.0`. So a
function which accepts a `float` can be passed an `int`. This breaks down though once you have a function taking a 
list of floats. If you try and write the following code:

```python
def double_then_sum(items: list[float]):
    return sum(item * 2 for item in items)
    
my_integers: list[int] = [2, 4]
my_doubled_total = double_then_sum(my_integers)
```

then mypy (or another type checker) will give the error:

```
error: Argument 1 to "double_then_sum" has incompatible type "list[int]"; expected "list[float]"  [arg-type]
note: "List" is invariant -- see https://mypy.readthedocs.io/en/stable/common_issues.html#variance
note: Consider using "Sequence" instead, which is covariant
```

You can read a thorough writeup of what's going in the [page linked by the error,](https://mypy.readthedocs.io/en/stable/common_issues.html#variance) 
but effectively it's because the function signature `double_then_sum(items: list[float])` means "I accept a list of floats and may add a float to it".

You can see why this wouldn't work with this contrived example:

```python
def add_5_point_0(items: list[float]):
    items.append(5.0)
    
my_integers: list[int] = [2, 4]
add_5_point_0(my_integers)
print(my_integers)
# 2, 4, 5.0
#       ^ this is clearly not an integer
```

`Sequence` does not have the same problem because it cannot be appended to. So if I pass the function a list of integers 
the type checker can ensure that it stays as a list of integers.


## Accepts a wider variety of inputs
Another benefit of `Sequence` is that it can accept a much wider variety of types (including custom classes written by you).
This makes it much easier to write functions are re-usable and compose well together.

Consider my earlier `double_then_sum` function. But this time I've got an input that's a tuple. This seems like a 
perfectly valid use-case. There's no reason why I should have to convert this to a list.

```python
my_integers = (2, 4, 5)
my_doubled_total = double_then_sum(my_integers)
```

However, mypy says the following:

```
error: Argument 1 to "double_then_sum" has incompatible type "tuple[int, int, int]"; expected "list[int]"  [arg-type]
```

A tuple is *not* a list. But a tuple is a `Sequence`.

### Bonus - I would also consider Collection instead of Sequence

I also often go a step further with specifying the type to indicate exactly what I require. If the order of the items 
doesn't really matter to my function then I can hint as a `Collection` instead. 

My function `double_then_sum` should probably work with sets:

```python
some_set_of_numbers = set([2, 3, 4])
my_doubled_total = double_then_sum(some_set_of_numbers)
```

but mypy says: 

```
Argument 1 to "double_then_sum" has incompatible type "set[int]"; expected "Sequence[int]"  [arg-type]
```

I can fix this by swapping `Sequence` for `Collection`:

```python
from typing import Collection
def double_then_sum(items: Collection[int]):
    return sum(item * 2 for item in items)
    
some_set_of_numbers = set([2, 3, 4])
my_doubled_total = double_then_sum(some_set_of_numbers)
```

The type checker is then happy with this as a set is an instance of a `Collection`.

## Wrapping up

TODO: write me