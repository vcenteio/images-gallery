#bin/zsh

project_version=$(npm version --json | jq .frontend | sed 's/\"//g')

docker build . -t images-gallery-frontend:$project_version