---
layout: post
published: false
title:  "Write more useful exceptions in python"
date:   2022-10-21 10:00:00
categories: programming
summary: "Using specific exceptions with structured data to help consumers of your exceptions"
icon: fab fa-python
tags:
    - python
    - exceptions
    - languages
    - structured data
---

## Why I'm writing this

I've recently (not so recent now: this is an old post I rescued from my drafts folder) been tidying up error reporting 
at work. There's a few noisy exceptions coming from some third party libraries and older code. I'd like to be able to
filter them out programmatically so that they don't end up in [sentry](https://sentry.io/).

However, I've been running into a problems when the exceptions are raised like this:

```python
    raise TimeoutError("When trying to do the thing we timed out for reason X")
```

I'm having to do a combination of rewriting code and some fragile string matching on the error messages so that I can 
filter out what's a really important error, what can be retried and what is more like warning.

## What would I prefer
For anyone writing libraries, either publicly or for use within a codebase, there's a number of steps that can
be applied to make things better.

### Pick a good base exception from the standard library 
The python standard library defines [a number of exception classes](https://docs.python.org/3/library/exceptions.html#base-classes).
Starting with the most specific one you can find communicates a lot about what kind of error has happened.

### Sub typed errors
Following on from picking a good base exception. Create your own class for each type of error you have and give it
a sensible name. For example there are lots of different things that can timeout. Rather than throwing a generic 
`TimeoutError` exception your library could subclass it:

```python
class QueryTookTooLong(TimeoutError):
    pass
```

This makes it easier to catch and allows consumers to handle different errors in a different way:

```python
try:
    do_something()
except QueryTookTooLong:
    record_slow_query()
except ServerRejectedQueryBecauseItWasBusy:
    back_off_and_try_a_different_server()
except Exception:
    panic_an_error_we_didnt_know_about_happened()
```


### Link all types of error back to the library with an ABC
```python
class SuperCoolPackageError(Exception, ABC):
    """All exceptions in this library are instances of a SuperCoolPackageError"""
    pass

class QueryTookTooLong(TimeoutError, SuperCoolPackageError):
    pass
```

### Provide structured data in the exception
```python
class QueryTookTooLong(TimeoutError):
    server_address: str
    query_type: str
```

### Provide a link to documentation about this error (bonus points for this one)
The SqlAlchemy library provides links to documentation about an error in the exception string. This makes reading up about the error much easier
