---
layout: post
published: false
title:  "Write more useful exceptions in python"
date:   2022-01-13 10:00:00
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

I've recently been tidying up error reporting at work. There's a few noisy exceptions
coming from some third party libraries and older code. I'd like to be able to
filter them out programmatically so that they don't end up in [sentry](https://sentry.io/).

However, I've been running into a problems when the exceptions are raised like this:

```python
    raise TimeoutError("When trying to do the thing we timed out for reason X")
```

## What would I prefer
How could this be improved:

### Sub typed errors

```python
    class QueryTookTooLong(TimeoutError):
        pass

```

### Link errors to the library
```python
    class SuperCoolPackageError(Exception, ABC):
        """All exceptions in this library are instances of a LagomException"""
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
