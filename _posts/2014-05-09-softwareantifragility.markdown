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
Evolution is a good example of an anti-fragile system.
Life throws a series of problems at species and through survival of the fittest the species becomes more suited to its environment.
This got me thinking about how this idea might apply to software development.

#### Robustness. Better than fragility right?
We don't want fragile software. If your application crashes the moment someone clicks in the wrong spot you're gonna have a bad time.
So the first step in countering this is normally to make our software less error prone.
When a service dies we handle it gracefully and carry on as best we can.
Now whilst this is almost certainly better than having a fragile piece of software is this the best we can do?
Every error, warning and problem our users run in to is effectively a piece of information we could use to improve our code base.
I would even go as far as to say if we are too robust we risk hiding some potentially useful information ([fail fast][wiki-fail-fast] is one way of countering this).

#### Errors as useful input
You test your software (you do right?).
This eliminates a lot of bugs and issues before your software even meets the outside world.
Now lets say you spend an hour testing your software.
You release it. You then get 4000 users over the next day each spending 15 minutes using the software.
In this one day your users have now spent one thousand times longer testing the software than you did.
In addition they've done some really odd things (they are users after all).
At the same time our software will also be exposed to the effects of the real world. Maybe some hardware will fail.
Maybe a network connection will go through a sluggish period.

Harnessing this information is a good thing &trade;
If the problem is big enough then your users will probably get in touch.
If it's small then they'll likely ignore it.
This is one of the reasons I like error tracking software (see [bugsnag][errors-bugsnag] and [raygun][errors-raygun]).

#### Speed of change - Continuous Delivery, Agile, Kanban, XP and others
Once we are getting this steady flow of errors we need to start doing something about it.
If the errors are ignored then the risk of them compounding increases and it all starts to seem a bit fragile.
One of the core strengths of agile development (and other related methodologies) is the ability to respond rapidly to change.
Now with every error the software can be improved. Getting incrementally better with each shock.
The combined system of the software, error tracking and development team is now starting to look anti-fragile.

#### Artificial Sources of errors
Users and natural hardware failures don't have to be our only source of shocks.
They can be simulated artificially either during testing or, for bolder developers, when live.
For hammering the front end [Gremlins.js][random-gemlins] is a handy little library.
Netflix are also fairly well know for using [chaos monkey][random-chaosmonkey] to randomly taken down hardware.
This approach allows us to provide extra stress on our software. Forcing it to be a better fit for our environment.

#### Closing thoughts
Errors and failures don't have to be negative.
When handled correctly they are in fact a valuable form of data that allows us to improve our software.
I like to think I write robust software. Can I move to anti-fragility?

[book-antifragile]: http://www.amazon.co.uk/gp/product/0141038225/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0141038225&linkCode=as2&tag=mesdebl03-21
[errors-bugsnag]: http://bugsnag.com
[errors-raygun]: http://raygun.io
[random-gemlins]: https://github.com/marmelab/gremlins.js
[random-chaosmonkey]: https://github.com/Netflix/SimianArmy
[wiki-fail-fast]: http://en.wikipedia.org/wiki/Fail-fast