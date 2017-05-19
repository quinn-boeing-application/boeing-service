FROM node:boron

COPY . /srv/
WORKDIR /srv
EXPOSE 8080
CMD [ "node", "index.js" ]
