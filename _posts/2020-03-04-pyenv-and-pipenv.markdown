---
layout: post
published: false
title:  "pipsi + pyenv + pipenv"
date:   2020-03-04 10:00:00
categories: programming
summary: "Taming python setups with pipenv pyenv pipsi"
icon: fab fa-python
tags:
    - python
    - environment
    - package managers
    - pipenv
---
Let's start with the obligitory xkcd comic for this topic:

[![xkcd comic of mess of python deps](https://imgs.xkcd.com/comics/python_environment.png)](https://xkcd.com/1987/)

This blogpost will hopefully introduce a relatively sensible
way of trying to keep python versions and their dependencies clean


## Setup

### Step One - pipsi
The first step is to get pipsi on your system. To quote their
docs:

> pipsi makes installing python packages with global entry points painless

We'll use this later to install global cli scripts in isolated 
from the rest of our python verions and packages.

### Step Two - pyenv
We want pyenv to manage all the different versions of python.
Installation instructions are covered in the instructions
https://github.com/pyenv/pyenv#installation


### Step Three - pipenv
Using pipsi from the first step we can now install pipenv in its own isolated
environment:

```bash
pipsi install pipenv
```

## Bringing it all together
Now say we need to start a new project which should target python
3.7.1 let's run:

```bash
mkdir new_project
cd new_project
pipenv --python 3.7.1
```
we should then see:
```
Warning: Python 3.7.1 was not found on your system…
Would you like us to install CPython 3.7.1 with pyenv? [Y/n]: 
```

and then:

```
Installing CPython 3.7.1 with pyenv (this may take a few minutes)…
✔ Success! 
Downloading Python-3.7.1.tar.xz...
-> https://www.python.org/ftp/python/3.7.1/Python-3.7.1.tar.xz
Installing Python-3.7.1...
Installed Python-3.7.1 to /home/steve/.pyenv/versions/3.7.1


Creating a virtualenv for this project…
Pipfile: /home/steve/code/new_project/Pipfile
Using /home/steve/.pyenv/versions/3.7.1/bin/python3 (3.7.1) to create virtualenv…
⠇ Creating virtual environment...created virtual environment CPython3.7.1.final.0-64 in 483ms
  creator CPython3Posix(dest=/home/steve/.local/share/virtualenvs/temppy-AdQMg6OT, clear=False, global=False)
  seeder FromAppData(download=False, pip=latest, setuptools=latest, wheel=latest, via=copy, app_data_dir=/home/steve/.local/share/virtualenv/seed-app-data/v1)
  activators BashActivator,CShellActivator,FishActivator,PowerShellActivator,PythonActivator,XonshActivator

✔ Successfully created virtual environment! 
Virtualenv location: /home/steve/.local/share/virtualenvs/temppy-AdQMg6OT
Creating a Pipfile for this project…

```

Let's break down what this has done:

1. Detected that we didn't have python 3.7.1 on our system and installed it for us.
2. Setup an isolated virtualenv for this project using python 3.7.1
3. Created a pipfile for the project to describe our dependencies.
