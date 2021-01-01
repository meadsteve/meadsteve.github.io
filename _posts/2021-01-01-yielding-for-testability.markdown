---
layout: post
published: false
title: "Yielding for testability in python"
date:  2021-01-01 10:00:00
categories: programming
summary: "A pattern I've been trying out in python for output to the console"
icon: fab fa-python
tags:
    - python
    - yield
    - generator
    - testing
    - cli
---

I was writing a small cli tool and wanted to try out [typer](https://typer.tiangolo.com/).
I'm a big fan of fast api, so I thought a cli library from the same author was worth a look.
This blog post will cover a pattern I ended up using to help with testing.

## The app and the first attempt at tests
I won't go into too much detail about my actual problem, but I ended up with something like the 
following:

```python
import typer

def my_command(some_input: str):
    typer.echo(f"Starting up")
    # Do the first thing
    typer.echo(f"Result of first thing was X")
    # Do the second  thing
    typer.echo(f"Result of second thing was X")
    # Do some clean up
    typer.echo(f"All done")

if __name__ == "__main__":
    typer.run(my_command)
```

The value in the code I was writing was the output of `typer.echo`. So I wanted to test it.
Initially in my tests I was monkey patching `typer.echo` and asserting that it matched what
I wanted. This was okay, but I don't like monkey patching with mocks as it often starts to
get very tangled and complicated.

## A solution? Yielding.
Since I already had a function representing my command invocation I thought it would be
really nice if I could just return the output. Then I could call the function and assert
that it had output what I wanted. However, given that quite significant delays could
happen in between each of my echo statements I didn't really want to wait until the end
to get all my output. So instead `yield` seemed like a good candidate.  I update my code
to look something like this:

```python
@dataclass
class Echo:
    message: str

def my_command(some_input: str):
    yield Echo(f"Starting up")
    # Do the first thing
    yield Echo(f"Result of first thing was X")
    # Do the second  thing
    yield Echo(f"Result of second thing was X")
    # Do some clean up
    yield Echo(f"All done")

```

Now my function was a generator. The code looked almost identical which was nice. 
I did need to add a layer on top to run this generator but this was not too complicated:

```python
import typer

def run_cli(generator_func):
    for output_line in generator_func():
        typer.echo(output_line.message)
```

and now my test cases could look like this:

```python
def test_something():
    actual = list(my_command("input"))
    expected = [
        Echo("first message"), 
        Echo("second message"), 
        Echo("etc.")
    ]
    assert actual == expected
```

I'm counting this as a success. My tests became a lot simpler which was my initial goal.
In addition, the `my_command` function lost its dependency on the `typer` library and became
agnostic to how the input is displayed to the user (though this wasn't really my initial goal).