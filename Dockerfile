FROM node:4.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install java
RUN apt-get update
RUN apt-get install -y default-jre
RUN apt-get install -y default-jdk
# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install -g grunt-cli
RUN npm install
# Bundle app source
COPY . /usr/src/app

RUN grunt apidoc

EXPOSE 8080 3322

CMD [ "npm", "start" ]
