FROM node:16-alpine

WORKDIR /opt/app

COPY package.json yarn.lock /opt/app/

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

CMD ["yarn", "start"]
