FROM bretfisher/jekyll-serve:gha-3065492800@sha256:2e00a1b2b8fbd3d47af7b2f26960d57a0f1a6daa04c00deab203c4751fc3e7b6

COPY Gemfile .
COPY Gemfile.lock .

RUN bundle install

CMD [ "bundle", "exec", "jekyll", "serve", "--force_polling", "-H", "0.0.0.0", "-P", "4000" ]