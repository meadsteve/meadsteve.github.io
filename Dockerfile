FROM starefossen/github-pages

WORKDIR /usr/src/app

ADD Gemfile /usr/src/app/Gemfile
ADD Gemfile.lock /usr/src/app/Gemfile.lock
RUN bundler install

ADD . .

EXPOSE 4000
