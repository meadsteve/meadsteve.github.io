---
layout: post
title:  "Dependency injection in Python"
date:   2020-02-04 10:00:00
categories: programming
tags:
    - python
    - development
    - dependency injection
    - testing
    - monkey patching
comments:
    title: Discuss this post over on reddit
    link: https://www.reddit.com/r/Python/comments/ez8jpg/types_and_dependency_injection_in_python/
---
This post will go into why I created [lagom][website-lagom], an auto-wiring dependency injection container for Python. 
Dependency injection is not something as commonly used in Python as it is in some other languages 
(especially statically typed languages). This is a bit of a shame as it is a powerful technique which helps with 
building loosely coupled but cohesive code.

I'll save writing more on why I think dependency injection is great, even in Python, 
for a later blog post. However, as types seem to be becoming more popular in Python, 
I wanted to explore dependency injection combined with explicit typing. I designed a 
container with three main goals in mind:

* Strong usage of types - work well with [mypy][website-mypy]
* Minimal modification of code - existing code should *not* get polluted by the container
* It should push code towards being more decoupled and avoid the need for monkey patching in tests

Let's take the example of a simple web app (built using [starlette][website-starlette])
that will provide a json blob to greet visitors:

```python
def homepage(request):
    return JSONResponse({
        'message': "hello"
    })


app = Starlette(debug=True, routes=[
    Route('/', homepage),
])
```
The nice thing about starlette here is that my response handler `homepage` is
a pure function. It takes a request and returns a response without any side effects or
global state usage. This is very easy to test. 

At the moment there's no real need for any dependency injection or a container.
But next I would like to have the capability to generate a random message
for my guest. So I could write something like this:

```python
class MessageGenerator:
    _messages = ["Hello", "Hej", "Hellå"]

    def random_message(self):
        return random.choice(self._messages)
```

I would now like to link this to my web app in a way that's easy
to test. I wanted lagom to figure out how to build objects automatically
if the constructors are explicit or absent so I designed the following:

```python
from lagom import Container
container = Container()

def homepage(request, messages: MessageGenerator):
    return JSONResponse({
        'message': messages.random_message()
    })

# Notice this is the same as the earlier example but
# the handler is wrapped in: `container.partial`
app = Starlette(debug=True, routes=[
    Route('/', container.partial(homepage)),
])
```
The call to `container.partial(homepage)` returns a new function that's
bound to the container and any arguments that aren't provided are
automatically injected by the container.

The route handling function has been updated to take the message
generator. This highlights its dependencies very clearly and makes
it easy to write a test without any patching:

```python
def test_my_homepage_greets_my_guests():
    class FakeGreeter(MessageGenerator):
        def random_message(self):
            return "fake greeting"

    expected_response = JSONResponse({
        "message": "fake greeting"
    })
    assert homepage({}, FakeGreeter()).body == expected_response.body
```

Next up let's make the message generator a little more 
complicated and make the messages configurable (I won't discuss testing this here).

```python
class MessageGenerator:
    def __init__(self, messages):
        self._messages = messages

    def random_message(self):
        return random.choice(self._messages)

```

Lagom is now no longer able to automatically construct `MessageGenerator`
as it's not clear what should be passed to `messages`.

I made the decision early on to not base anything on name as this can
lead to hard to debug errors. Instead, lagom provides an interface for
defining how a type should be built:

```python
WELCOME_MESSAGES = ["Hello", "Hej", "Hellå"]

from lagom import Container
container = Container()
container[MessageGenerator] = lambda: MessageGenerator(WELCOME_MESSAGES)
```

In this example any time a `MessageGenerator` is asked for the lambda
is invoked and the result is returned. As requirements change this
setup/config can be updated without touching the handler function.

Providing the setup above as code has another added benefit: it
can be type checked.
Taking the following (broken) code:
```python
container = Container()
container[MessageGenerator] = lambda: "I'm a little teapot"
```
and running it through mypy will raise the following error:
```
example.py:21: error: Incompatible types in assignment (expression has type "Callable[[], str]", ...
```

I think this approach balances the lightweight approach of traditional Python
with some of the benefits of a more strictly typed design.

The code for this example can be found here: [https://github.com/meadsteve/lagom-example-repo][website-example-code]


[website-lagom]: https://github.com/meadsteve/lagom
[website-mypy]: http://mypy-lang.org/
[website-starlette]: https://github.com/encode/starlette
[website-example-code]: https://github.com/meadsteve/lagom-example-repo
