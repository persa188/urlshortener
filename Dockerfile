# base image
FROM node
MAINTAINER Daniel

# create the application directory
RUN mkdir -p /home/nodejs/app

# copy the application
COPY . /home/nodejs/app

# move to working directory
WORKDIR /home/nodejs/app
# install all npm modules
RUN npm install --production

#the port the app will listen on
EXPOSE 7070

# run the nodejs application
CMD NODE_ENV=production node app.js
