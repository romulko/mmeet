#!/usr/bin/env sh

# before start, please, clone repo into REPO_FOLDER folder

# vars
IMAGE_NAME=${SERVICE_NAME}.tar.gz

SSH_HOST=root@46.101.166.101

APP_FOLDER=/opt/app
REPO_FOLDER=${APP_FOLDER}/mmeet
DOCKER_COMPOSE_FOLDER=${REPO_FOLDER}/CICD/docker-compose

# cleanup local docker builds
docker stop "${SERVICE_NAME}" || true
docker rm "${SERVICE_NAME}" || true
docker rmi "mmeet/${SERVICE_NAME}" || true

# build an image and save it into local docker hub
docker build --memory="8g" --platform linux/amd64 --compress -t mmeet/"${SERVICE_NAME}":latest "${SERVICE_PATH}" || exit 1

# save an image as a file to upload it on the server
docker save mmeet/"${SERVICE_NAME}":latest | gzip > "${IMAGE_NAME}" || exit 1

# upload the image on the server
rsync -r -v --progress -e ssh "${IMAGE_NAME}" ${SSH_HOST}:"${DOCKER_COMPOSE_FOLDER}" || exit 1

rm "${IMAGE_NAME}"

docker rmi mmeet/"${SERVICE_NAME}"

ssh -t ${SSH_HOST} "mkdir -p ${APP_FOLDER}/postgres_data \
&& mkdir -p ${APP_FOLDER}/redis_data \
&& mkdir -p ${APP_FOLDER}/rabbitmq_data \
&& cd ${REPO_FOLDER} \
&& git pull \
&& cd ${DOCKER_COMPOSE_FOLDER} \
&& docker compose stop \
&& docker rm ${SERVICE_NAME} || true \
&& docker rmi mmeet/${SERVICE_NAME} || true \
&& docker load --input ${IMAGE_NAME} \
&& docker compose up -d --remove-orphans \
&& rm ${IMAGE_NAME}"
