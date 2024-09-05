FROM node:18-alpine

WORKDIR /opt/app

COPY package.json yarn.lock /opt/app/

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start"]
