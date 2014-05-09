---
layout: post
title:  "Anti-fragility in software"
date:   2014-05-09 10:00:00
categories: software-design
tags:
- anti-fragility
- agile
- bugs
- error-tracking
---

#### anti-fragility
Recently I've been reading [Antifragile: Things that Gain from Disorder][book-antifragile] by Nassim Nicholas Taleb.
Now whilst I sometimes find his writing style a little annoying he raises some very interesting concepts in the book.
The core idea is that the opposite of something fragile isn't just robust but is anti-fragile.
A fragile system is one that breaks down when shocked.
A robust system is one that is resistant and doesn't break when exposed to shocks.
An anti-fragile system is one that is actually improved by shocks. It gets better with each shock. Provided the shocks aren't too big.
This got me thinking about how this thought process can be applied to software.

#### Robustness? Too much bad?
We don't want fragile software. If your application crashes the moment someone clicks in the wrong spot you're gonna have a bad time.
So the first step in countering this is normally to make our software less error prone.
When a service dies we handle it gracefully and carry on as best we can.


#### Speed of change - CD & CI

#### Errors as useful input
[bugsnag][errors-bugsnag], [raygun][errors-raygun]

#### Artificial Sources of errors
[Gremlins.js][random-gemlins], [chaos monkey][random-chaosmonkey]

[book-antifragile]: http://www.amazon.co.uk/gp/product/0141038225/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0141038225&linkCode=as2&tag=mesdebl03-21
[errors-bugsnag]: http://bugsnag.com
[errors-raygun]: http://raygun.io
[random-gemlins]: https://github.com/marmelab/gremlins.js
[random-chaosmonkey]: https://github.com/Netflix/SimianArmy