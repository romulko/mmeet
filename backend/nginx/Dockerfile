FROM nginx:1-alpine

RUN apk update
RUN apk upgrade
RUN apk add --no-cache bash python3 py3-pip certbot
RUN apk add nano
RUN pip install certbot-nginx

COPY ./nginx.conf /etc/nginx/nginx.conf
