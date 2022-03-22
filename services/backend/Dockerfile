FROM node:16.14-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install -g npm@latest
RUN npm install
# RUN npm ci --only=production

RUN chown -R node /app/node_modules
USER node

EXPOSE 8080
CMD [ "npm", "run", "dev" ]
