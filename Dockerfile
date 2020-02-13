FROM bretfisher/jekyll-serve

COPY Gemfile .
COPY Gemfile.lock .

RUN bundle install