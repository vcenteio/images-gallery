#bin/zsh

image_name=images-gallery-api:$(poetry version -s)

if $(docker ps -a | grep $image_name); then
    echo "DOCKER_RUN: Container already exists. Starting container..."
    docker container start image_name
else
    echo "DOCKER_RUN: Container does not exist. Creating container..."
    docker run --rm -p 5000:5000 $image_name
fi
