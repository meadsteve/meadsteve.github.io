---
title:  "Python"
layout: kb
tags:
    - python
---
# Python

## Cache files
Clear them out with:
```
find . -name "*.pyc" -exec rm -f {} \;
```

## Environment variables that may or may not help with debugging

```bash
OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES # On a mac
PYDEVD_USE_CYTHON=NO                    # Potentially after pycharm 2020.2
PYDEVD_USE_FRAME_EVAL=NO                # Potentially after pycharm 2020.2
```