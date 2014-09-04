---
layout: post
title:  "London JS Conf Autumn 2014"
date:   2014-09-04 14:00:00
categories: conferences js
tags:
- js
- conference
- talks
---

Javascript focused talks at the [Royal institution][website-rigb] in London.
These are my scrappy notes and vague memories typed up so this may go through quite a few revisions

Talks' Summary/notes/braindumps
======

## The state of JavaScript – Domenic Denicola
Near future with the web:

*  [Extensible web manifesto][website-extensibleweb]
*  [Polymer][website-polymer] by google
*  [x tags][website-x-tags] by mozilla

Things made JS:

* Bot controls
* JS implementation of git
* PDF JS. This is actually what firefox uses to render pdfs.
* Flash in JS!! (in progress)

Things in the language:

* asm.js. c++ compiled in to subset of js. Only 1.5/2 times slower than the c++.
* JS as the assembly language of the web.
* [Traceur][website-traceur] to transpile ecma6 (or .next) to ecma5
* All the new features planned in ecma6.

## Acceptance testing – Vikki Read

* "Not tdd is debug later development" - quote from agile2014 (can't remember who she got it from)
* Tests can make good internal documentation. They don't rot unlike wikis.
* Write the tests that give you the **confidence** for the **important** parts of the system.
* Be selective about which and how many tests you run.
* Slow acceptance tests not necessarily bad. Finding a bug after 12 hours is better than a bug report from a customer in 3 weeks.
* [Shoulda put a test on it][repo-putatestonit]

## Server-less applications powered by Web Components – Sébastien Cevey
TLDR: Web components and poylmer kick ass. The guardian are open sourcing some nice elements.
Especially some for doing metrics/reporting:

* [graphite metrics][repo-element-graphite-metrics]
* [Cloudwatch stats][repo-element-aws-cloudwatch]
* [Aws config][repo-element-aws-config]

Clientside for the win.

## Science !!!
A sciency interlude. Who doesn't love thermite, jelly babies with perchlorate and exploding hydrogen.

## Fun With the command Line – Paul King
Fun talk about the command line. Cool demos (including some scrillex sampling).
Bit disappointed it wasn't a talk on js on the command line.

## JavaScript ♥ Unicode – Mathias Bynens

TODO

## A tale in production node.js – Nuno Job

TODO

## Byte Shifting – Martin Kleppe

TODO

[website-home]: http://londonjsconf.com/
[website-rigb]: http://www.rigb.org/
[website-extensibleweb]: http://extensiblewebmanifesto.org/
[website-polymer]: http://www.polymer-project.org/
[website-x-tags]: http://x-tags.org/
[website-traceur]: https://github.com/google/traceur-compiler
[repo-putatestonit]: http://bit.ly/putatestonit
[repo-element-graphite-metrics]: https://github.com/guardian/element-graphite-metrics
[repo-element-aws-cloudwatch]: https://github.com/guardian/element-aws-cloudwatch
[repo-element-aws-config]: https://github.com/guardian/element-aws-config