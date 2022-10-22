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
raise Exception("The thing timed out for reason X")
```

I'm having to do a combination of rewriting code and some fragile string matching on the error messages so that I can 
filter out what's really an important error, what can be retried and what is more like a warning.

## What would I prefer
For anyone writing libraries, either publicly or for use within a codebase, there's a number of steps that can
be applied to make things better. 

It's also worth thinking about redesigning and using exceptions less, especially for flow control, 
but that's a bigger change and a post topic for another day.
{: .aside}

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
    """All exceptions are instances of a SuperCoolPackageError"""
    pass

class QueryTookTooLong(TimeoutError, SuperCoolPackageError):
    pass
```

This means consumers can handle all errors from your package in a consistent way. For example error stats for your
library could be fed into monitoring or logging and help the team asses if more work needs to be done on the integration
of the library.

### Provide structured data in the exception
```python
class QueryTookTooLong(TimeoutError, SuperCoolPackageError):
    server_address: str
    query_type: str
```
This makes it easier to programmatically act on the exception. Useful information can also be extracted into a logging
context. Maybe there's a particular server that's having a problem?

### Add notes and explanations to the exception's docstring
This is often the first place a user will land when trying to debug your exception. The more context and details you
have here the easier it is for your consumers to understand what happened.

SqlAlchemy has a number of good examples of this:

```python
# Code sample from https://github.com/sqlalchemy/sqlalchemy/blob/d5e31d130808c94f09e51e9afb222c4efa63875c/lib/sqlalchemy/orm/exc.py#L35
class StaleDataError(sa_exc.SQLAlchemyError):
    """An operation encountered database state that is unaccounted for.
    Conditions which cause this to happen include:
    * A flush may have attempted to update or delete rows
      and an unexpected number of rows were matched during
      the UPDATE or DELETE statement.   Note that when
      version_id_col is used, rows in UPDATE or DELETE statements
      are also matched against the current known version
      identifier.
    ...
    """
```

### Provide a link to documentation about this error (bonus points for this one)
If you have documentation about the error on the web. Link to it. Again, the SqlAlchemy library deserves a mention. 
It provides links to documentation on the web for each exception. This really helps with the developer experience and 
makes your library much easier to use.

```python
# Code sample from https://github.com/sqlalchemy/sqlalchemy/blob/79dbe94bb4ccd75888d57f388195a3ba4fa6117e/lib/sqlalchemy/exc.py#L54
def _code_str(self) -> str:
    return (
        "(Background on this error at: "
        "https://sqlalche.me/e/%s/%s)"
        % (
            _version_token,
            self.code,
        )
    )
```

## Thank you
Hopefully at least one of these suggestions (they can all be applied independently) is useful to you and you'll take
it away and improve some code you're working on.