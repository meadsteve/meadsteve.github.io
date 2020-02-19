---
layout: post
title:  "Monitoring async Python"
date:   2020-02-19 10:00:00
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
after the call to sleep will be executed immediately. In reality it'll take
time for other work in the loop to be dealt with. Measuring this difference
will give us a number for how busy the event loop is.

The code samples below assume Python 3.7 (but the approach will make sense for 3.6 or 3.8)

```python
from asyncio import get_running_loop, sleep, AbstractEventLoop

class Monitor:
    lag: float = 0

    def __init__(self, interval: float = 0.25):
        self._interval = interval

    def start(self):
        loop = get_running_loop()
        loop.create_task(self._monitor_lag(loop))

    async def _monitor_lag(self, loop: AbstractEventLoop):
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
can act as an early warning system before things get too bad.

```python
from asyncio import AbstractEventLoop, Task

class Monitor:
    active_tasks: float = 0

    async def _monitor_lag(self, loop: AbstractEventLoop):
        while loop.is_running():
            #...All of the lag code...
            tasks = [task for task in Task.all_tasks(loop) if not task.done()]
            self.active_tasks = len(tasks)
```