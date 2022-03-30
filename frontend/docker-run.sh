#/bin/zsh

image_name=images-gallery-frontent:$(npm version --json | jq .frontend | sed 's/\"//g')

if $(docker ps -a | grep $image_name); then
    echo "DOCKER_RUN: Container already exists. Starting container..."
    docker container start image_name
else
    echo "DOCKER_RUN: Container does not exist. Creating container..."
    docker run --rm -p 3000:3000 $image_name
fi
