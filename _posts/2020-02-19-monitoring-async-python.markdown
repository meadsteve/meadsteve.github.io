---
layout: post
published: false
title:  "Monitoring async Python"
date:   2020-02-24 10:00:00
categories: programming
summary: "Thoughts and code samples on how to monitor the load in an async Python system"
icon: fab fa-python
tags:
    - python
    - async
    - event loop
    - monitoring
---

This post will cover some basics on how to monitor the health of a
Python app making use of asyncio. I won't go in to detail about
async python in general as there are already a bunch of great
tutorials out there. I'll focus instead on an approach for
monitoring the event loop. To quote the python docs:

> The event loop is the central execution device provided by asyncio. It provides multiple facilities, including:	
> * Registering, executing and cancelling delayed calls (timeouts).	
> * Creating client and server transports for various kinds of communication.	
> * Launching subprocesses and the associated transports for communication with an external program.	
> * Delegating costly function calls to a pool of threads.

I'll focus especially on "Delegating costly function calls". Most of
the work scheduled on the event loop should be fairly quick and non-blocking.
If anything starts to use a lot of CPU it should be delegated to something else. 
Otherwise the health of your app will start to degrade.

The "health" of the event loop isn't a binary healthy/unhealthy thing so instead
I want to see a value across time showing me how much work I'm putting on the loop.

One of the simplest ways to do this is to time how long it takes to resume a piece
of code that's performed an `asyncio.sleep`. In ideal conditions the code
after the call to sleep will be executed immediately after the requested duration.
In reality it'll take time for other work in the loop to be dealt with. 
Measuring this difference will give us a number for how busy the event loop is.

The code samples below assume Python 3.7 (but the approach will make sense for 3.6 or 3.8)

```python
from asyncio import get_running_loop, sleep, AbstractEventLoop

class Monitor:
    lag: float = 0

    def __init__(self, interval: float = 0.25):
        self._interval = interval

    def start(self):
        loop = get_running_loop()
        loop.create_task(self._monitor_loop(loop))

    async def _monitor_loop(self, loop: AbstractEventLoop):
        while loop.is_running():
            start = loop.time()
            await sleep(self._interval)
            time_slept = loop.time() - start
            # TODO: push this lag into a monitoring system
            self.lag = time_slept - self._interval  
```

calling `Monitor().start()` creates a new task on the event loop. This task
records a time, sleeps for 0.25 seconds then measures the new time. This
lag can then be pushed to some monitoring system and graphed.

If after a change is made to production this value jumps up then I know
those changes have introduced more blocking work onto the loop. This
can act as an early warning sign before things get too bad.

Another aspect I want to monitor is the number of active tasks on the event 
loop. For a system in a steady healthy state this number should stay roughly 
constant.

This can be tracked by adding some code to the `_monitor_loop` task
from earlier:

```python
from asyncio import AbstractEventLoop, Task

class Monitor:
    active_tasks: float = 0

    async def _monitor_loop(self, loop: AbstractEventLoop):
        while loop.is_running():
            #...All of the lag timing code from before...
            tasks = [t for t in Task.all_tasks(loop) if not t.done()]
            self.active_tasks = len(tasks)
```

Again this `active_tasks` value should be pushed into whatever monitoring system is 
being used.

Now the only thing I need to do is start this monitor when the app loads.
For example in an app I run built using FastAPI:

```python
# https://github.com/meadsteve/british_food_generator/blob/master/british_food_generator/app.py
from fastapi import FastAPI
from british_food_generator.monitoring.asyncio import Monitor

monitor = Monitor(0.25)
app = FastAPI(title="British Food Generator")

@app.on_event("startup")
def start_monitoring():
    monitor.start()
```

The real benefit with this approach is that I can spot warning signs of a 
problem before any users notice a performance impact. If either measure indicates 
some problems I can start investigating straight away. At this stage the code could 
be run locally with the event loop in debug mode. This is explained a little better in
[the asyncio dev docs][docs-asyncio-dev] and gives some tooling around spotting
blocking tasks and other issues.


[docs-asyncio-dev]:https://docs.python.org/3.8/library/asyncio-dev.html#asyncio-dev