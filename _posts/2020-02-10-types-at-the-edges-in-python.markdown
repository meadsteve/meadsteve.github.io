---
layout: post
title:  "Types at the edges in Python"
date:   2020-02-10 10:00:00
categories: programming
tags:
- python
- types
- testing
- contracts
- pydantic
---

For a new web service in python there are 3 things I now often start
with:
 * [Pydantic][website-pydantic]
 * [mypy][website-mypy]
 * Production error tracking of some kind ([Sentry][website-sentry] is great)
 
## Why
This main reason for this is because I don't like errors like this:

```
AttributeError: 'NoneType' object has no attribute 'strip'
```

It's hard to understand. Why am I trying to strip whitespace from None?
How did I end up in this part of the code? What have I misunderstood?

Instead I would prefer to see something like this error:

```
1 validation error for ProductDetails
description
  none is not an allowed value (type=type_error.none.not_allowed)
```

Now I can see that when getting ProductDetails the value `description` 
which I'd assumed was always populated is `None`. It's much easier
for me to see what about my mental model was wrong with this error.

## How Pydantic helps
When integrating an API we read the documentation. 
We check the contracts provided. We use any test services available.
After this process we have some client code with a bunch of (somewhat)
tested assumptions. We then launch this code into production and our
assumptions are tested against reality. If we're lucky our assumptions
turn out to be correct. If not we likely encounter some
cryptic `NoneType` errors like the one at the start of this post.

Pydantic can help by formalising our assumptions. For example
imagine a call to an API to get details about a product for a webshop
of some kind:

```python
    def get_product_details(pid: str):
        """
            A dictionary with the product details:
                in_stock - bool
                name - str
                description - str
        """
        resp = requests.get(f"https://shopping.com/product/{pid}")
        return resp.json()
```

with Pydantic I could instead write the function as:

```python
    class ProductDetails(BaseModel):
        in_stock: bool
        name: str
        description: str

    def get_product_details(pid: str) -> ProductDetails:
        resp = requests.get(f"https://shopping.com/product/{pid}")
        return ProductDetails(**resp.json())
```

Pydantic checks that each key I expected exists and is of the correct 
type. So now all the assumptions I've made about
the shape of the data is a runtime contract, expressed in native
python. If in production it turns out that description is, in fact, 
optional I'll get a very descriptive error and the code will fail early.

## How mypy carries on helping
Once I see the error at the start of this post (thanks error reporting) I
know what is wrong about my assumptions and I make the following change to 
my code:

```python
    class ProductDetails(BaseModel):
        in_stock: bool
        name: str
        description: typing.Optional[str]
```

I run mypy next and get:
```
product/details.py:63: error: Item "None" of "Optional[str]" has no attribute "strip"
```
I go to this line and them remember that I wrote a function to tidy the
whitespace a little:

```python
    def tidied_up_description(details: ProductDetails) -> str:
        return details.description.strip()
```

now I can make mypy pass by dealing with the new `None` case:

```python
    def tidied_up_description(details: ProductDetails) -> str:
        return (details.description or "").strip()
```

All of this flows automatically by stating and then updating my
assumptions in the form of a Pydantic model. Once I've updated
this and any other errors I deploy my changes. Hopefully now 
we'll have a system running error free.

## Request validation

I can also apply exactly the same kind of logic on data coming
into my system. For example let's look at a POST endpoint for
ordering a product in my webshop (I picked [FastAPI][website-fastapi]
but you could choose anything really):
```python
    class ProductOrder(BaseModel):
        product_id: str
        quantity: int
    
    @app.post("/order/")
    async def add_item(order: ProductOrder):
        # Do something with order
        return "ok"
```
FastAPI was used as it integrates with Pydantic out of the box
but, again, this could be built with any framework. The post data 
gets loaded automatically into this Pydantic model (thanks to FastAPI). 
Any validation errors will result a 400 error being returned to the browser. 
An added benefit of Pydantic is that json schemas can be generated for each model 
so we can communicate our requirements in a platform neutral fashion.

We can also do exactly the same with the data leaving our system
so any consumers of our API can rely on the schema we've
given them.

## The big picture
Once all API communication is type checked, and all our incoming
requests go through our models then we'll have a system something 
like this:

![System diagram showing pydantic at interfaces with the outside world](/images/2020-02-10-types-at-the-edges-in-python/types-at-the-edges.png)

Everything within the green box has a well known shape. It's much
easier to reason about and static analysis can help spot bugs early. 
Hopefully this post has given you a sense of why I think this is so powerful.
If you'd like to try out an example of how this can help I've
written a mini-kata like exercise here that can be worked through:
[meadsteve/types-at-the-edges-minikata][github-worked-example]


[website-pydantic]: https://pydantic-docs.helpmanual.io/
[website-mypy]: http://mypy-lang.org/
[website-sentry]: https://sentry.io/welcome/
[website-fastapi]: https://fastapi.tiangolo.com/
[github-worked-example]: https://github.com/meadsteve/types-at-the-edges-minikata