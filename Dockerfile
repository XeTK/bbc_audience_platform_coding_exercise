FROM node:10-alpine
LABEL maintainer="tom.rosier92@gmail.com"

RUN apk add --update python 
RUN apk add --update python-dev 
RUN apk add --update py-pip 
RUN apk add --update build-base 

WORKDIR /usr/bin/node_app

COPY package.json ./

RUN npm install

COPY *.js ./

RUN npm run build

EXPOSE 8080
CMD npm start