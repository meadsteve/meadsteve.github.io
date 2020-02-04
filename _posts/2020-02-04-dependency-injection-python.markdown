---
layout: post
title:  "Dependency injection in python"
date:   2020-02-04 10:00:00
categories: life
tags:
- python
- development
- dependency injection
- testing
- monkey patching
---

```python
def homepage(request):
    return JSONResponse({
        'message': "hello"
    })


app = Starlette(debug=True, routes=[
    Route('/', homepage),
])
```

```python
class MessageGenerator:
    def __init__(self, messages):
        self._messages = messages

    def random_message(self):
        return random.choice(self._messages)


WELCOME_MESSAGES = ["Hello", "Hej", "Hellå"]
```

```python
from lagom import Container

container = Container()
container[MessageGenerator] = lambda: MessageGenerator(WELCOME_MESSAGES)
```

```python
def homepage(request, messages: MessageGenerator):
    return JSONResponse({
        'message': messages.random_message()
    })


app = Starlette(debug=True, routes=[
    Route('/', container.partial(homepage)),
])
```

```python
def test_my_homepage_greets_my_guests():
    class FakeGreeter:
        def random_message(self):
            return "fake greeting"

    expected_response = JSONResponse({
        "message": "fake greeting"
    })
    assert homepage({}, FakeGreeter()).body == expected_response.body
```
[website-lagom]: https://github.com/meadsteve/lagom
[website-starlette]: https://github.com/encode/starlette
[website-example-code]:https://github.com/meadsteve/lagom-example-repo