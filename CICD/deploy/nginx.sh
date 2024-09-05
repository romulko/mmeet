#!/bin/bash

# shellcheck disable=SC2034
SERVICE_NAME=nginx
SERVICE_PATH=../../backend/${SERVICE_NAME}

source base.sh

# docker exec -it nginx certbot --nginx -d mmeet.app -d www.mmeet.app -d api.mmeet.app -d www.api.mmeet.app --agree-tos -m roman.malko@gmail.com
# apply certbot only after https://dnschecker.org/#A/api.mmeet.app shows all green checks
