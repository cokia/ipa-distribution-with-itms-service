FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
COPY package.json /src/package.json
RUN  cd /src; npm install
COPY . /src
EXPOSE 3000
WORKDIR /src
RUN npm install --global typescript
RUN npm install --global ts-node
CMD npm start
