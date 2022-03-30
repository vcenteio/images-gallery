#bin/zsh

project_version=$(poetry version -s)

poetry export -o requirements.txt

docker build . -t images-gallery-api:$project_version

rm requirements.txt