---
layout: post
published: false
title:  "How the British Food Generator works"
date:   2020-02-27 10:00:00
categories: programming
summary: "Introduction and explanation to the components that make up the british food generator"
icon: fas fa-utensils
tags:
    - python
    - ridiculous
    - delicious
    - api
    - markov
    - britain
    - food
---

Around a year ago a conversation at work made me realise that traditional british 
food names are a little bit strange. This lead me to create the [British food generator][website-food-gen].
In this post I want to introduce a few of the pieces of code that power the
British Food generator.

## Names

The name generation is fairly simplistic. I took a bunch of traditional food names and
split them into pieces. These pieces are then recombined randomly.

![image of name components](/images/2020-02-20-british-food-generator/food_names.png)

The complete code for doing this can be seen in the [name generation module][module-name-generation].

## Description
Next I used a [markov chain][wiki-markov] built on top of descriptions of British food. Markov chains
are often used for pun/joke text generation as they can be quite good at generating
almost realistic sentences from bodies of text. 

I opted to use the [markovify library][library-markovify] as it was simple to use. The
first step is to build a model from a sample of text. I collected descriptions of traditional
british foods and put these in a [text file][text-food]. Markovify can then compile a model from
this text. I wanted the description to reference the name in some way so a set of 
sample sentences are generated and are all scored based on whether they mention words 
in the food's name.

```python
def __init__(self, file_path):
    # The init method reds in a text file and builds the markov chain
    with open(file_path) as f:
        text = f.read()
    self._text_model = markovify.Text(text).compile()

def generate_food_description(self, name: str):
    sample = (self._desc_at_total_random() for _ in range(0, 500))
    scored_samples = (
        (desc, self._score_description(desc, name)) for desc in sample
    )
    sorted_samples = sorted(scored_samples, key=lambda x: x[1])
    best_fit = sorted_samples[0]

    log.info(f"Returning a description with a score of {best_fit[1]}")
    return best_fit[0]

def _desc_at_total_random(self):
    return self._text_model.make_short_sentence(200, tries=100)
```

Full code for the description generation can be found in the [description generation module][module-description-generation].

## Image
If possible I wanted to match the background image to the food being described.
I did this by taking a selection of food images (from wikipedia) and filtering
these to images that contain a word from the name or description. Full code
for this can be found in the [image generation module][module-image-generation].

## Bringing it all together
At this point I used my favourite framework for writing small APIs ([FastAPI][website-fastapi])
combined with [lagom][website-lagom] for Dependency injection and wrote the following route:
```python
# Setup fastapi with some html templates
app = FastAPI(title="British Food Generator")
templates = Jinja2Templates(directory="templates")

# Use lagom to configure my dependencies
# note: the markov chain is built here when the app starts
container = FastApiContainer()
container[FoodDescriber] = FoodDescriber(
    os.path.join(__location__, "real_descriptions_of_food.txt")
)
container[CompleteDishBuilder] = Singleton(CompleteDishBuilder)

# Define how to respond to GET / requests
@app.get("/")
def read_root(request: Request, builder=container.depends(CompleteDishBuilder)):
    dish = builder.generate_dish()
    return templates.TemplateResponse(
        "british_food.html",
        {
            "name": dish.name,
            "description": dish.description,
            "background_image": dish.image,
            "request": request,
        },
    )
```

I've missed a few details out about how the `CompleteDishBuilder` works but all
this does is pull together all the pieces previously discussed.

This app is then deployed on heroku and we all get to enjoy:

![example app output](/images/2020-02-20-british-food-generator/ham-pasty.jpg)

[website-food-gen]: https://british-food-generator.herokuapp.com
[website-fastapi]: https://fastapi.tiangolo.com/
[website-lagom]: https://github.com/meadsteve/lagom
[wiki-markov]: https://en.wikipedia.org/wiki/Markov_chain
[library-markovify]: https://github.com/jsvine/markovify
[module-name-generation]: https://github.com/meadsteve/british_food_generator/blob/de8ae5bec41c3c5479712844795aa1062b21f1c2/british_food_generator/name_generation.py
[module-description-generation]: https://github.com/meadsteve/british_food_generator/blob/c1ddba8de7bdc0101b5a4e5b7c9c6d2f97be3d42/british_food_generator/description_generation.py
[module-image-generation]: https://github.com/meadsteve/british_food_generator/blob/c1ddba8de7bdc0101b5a4e5b7c9c6d2f97be3d42/british_food_generator/image_generation.py
[text-food]: https://github.com/meadsteve/british_food_generator/blob/master/british_food_generator/real_descriptions_of_food.txt