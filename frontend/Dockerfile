FROM node:alpine

WORKDIR /app

EXPOSE 3000

COPY package.json package-lock.json /app/

RUN npm install --silent

COPY . /app/

RUN chown -R node /app/node_modules

CMD ["npm", "start"]