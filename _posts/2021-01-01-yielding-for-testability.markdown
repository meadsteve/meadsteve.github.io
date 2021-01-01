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

I was writing a small cli tool and wanted to try out https://typer.tiangolo.com/.
I'm a big fan of fast api, so I thought a CLI library from the same author was worth a look.
This blo g post will cover a pattern I ended up using to help with testing.

## The app and the first attempt at tests
I won't go into too much detail about my actual problem, but I ended up with something like the 
following:

```python
import typer


def main(name: str):
    typer.echo(f"Starting up")
    # Do the first thing
    typer.echo(f"Result of first thing was X")
    # Do the second  thing
    typer.echo(f"Result of second thing was X")
    # Do some clean up
    typer.echo(f"All done")

if __name__ == "__main__":
    typer.run(main)
```

The value in the script I was writing was the output of `typer.echo`. So I wanted to test it.
Initially in my tests I was monkey patching `typer.echo` and asserting that it matched what
I wanted. This was okay, but I don't like monkey patching with mocks as it often starts to
get very tangled and complicated.

## A solution? Yielding.
