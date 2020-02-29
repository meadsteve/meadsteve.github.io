---
title:  "Things I've learnt - in a less structured way than the posts"
layout: default
---
# Knowledgebase

## What
As I learn new things I'll try and document them here in very rough form building
up as I go. This will be scrappier and less complete than my blog posts
The idea for this section comes from [wiki.nikitavoloboev.xyz](https://wiki.nikitavoloboev.xyz/) via my friend's version 
[knowledge.mathew-davies.co.uk](https://knowledge.mathew-davies.co.uk/).

## Index
{% for page in site.knowledgebase %}
* [{{ page.title }}]({{ page.url }})
{% endfor %}