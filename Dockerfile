FROM starefossen/github-pages:171

WORKDIR /usr/src/app

RUN gem install bundler
ADD Gemfile /usr/src/app/Gemfile
ADD Gemfile.lock /usr/src/app/Gemfile.lock
RUN bundler install

ADD . .

EXPOSE 4000
