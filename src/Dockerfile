FROM    ubuntu:14.04

RUN apt-get update
RUN apt-get install -y --force-yes wget

RUN wget -O - http://deb.openalpr.com/openalpr.gpg.key | sudo apt-key add -
RUN echo "deb http://deb.openalpr.com/master/ openalpr main" | sudo tee /etc/apt/sources.list.d/openalpr.list

# make sure apt is up to date
RUN sudo apt-get update

# install OpenALPR
RUN sudo apt-get install -y --force-yes openalpr openalpr-daemon openalpr-utils libopenalpr-dev

# install nodejs and npm
RUN apt-get install -y --force-yes nodejs npm git git-core wget

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install --production

# Bundle app source
COPY . /src

EXPOSE  8080

CMD ["nodejs", "/src/index.js"]
