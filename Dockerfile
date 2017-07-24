# take default image of node boron i.e  node latest
FROM node:8.1.2

MAINTAINER Karen Nikoghosyan <nikoghosyankaren@gmail.com>

# create app directory in container
RUN mkdir -p /app

# set /app directory as default working directory
WORKDIR /app

# only copy package.json initially so that `RUN yarn` layer is recreated only
# if there are changes in package.json
#ADD package.json yarn.lock /app/
ADD package.json /app/

# --pure-lockfile: Don’t generate a yarn.lock lockfile
RUN yarn --pure-lockfile

# copy all file from current dir to /app in container
COPY . /app/

# expose port 4444
EXPOSE 4444

# cmd to start service
CMD [ "yarn", "start" ]
