FROM node:carbon

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN mkdir /code

WORKDIR /code

ADD . /code/

RUN yarn
