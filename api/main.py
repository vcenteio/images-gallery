import os

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests as rq
from dotenv import load_dotenv

from mongo_client import mongo_client


# create gallery database
gallery = mongo_client.gallery
# create images collection inside gallery database
images_collection = gallery.images


load_dotenv("./.env.local")
UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY")

if not UNSPLASH_KEY:
    raise EnvironmentError(
        "Please create a .env.local file and add a Unsplash API key"
    )

app = Flask(__name__)
CORS(app)


@app.route("/new-image")
def new_image():
    word = request.args.get("query")
    headers = {
        "Authorization": f"Client-ID {UNSPLASH_KEY}",
        "Accept-Version": "v1",
    }
    payload = {"query": word}
    response = rq.get(url=UNSPLASH_URL, headers=headers, params=payload)
    return response.json()


@app.route("/images", methods=["GET", "POST"])
def images():
    if request.method == "GET":
        images = images_collection.find({})
        return jsonify([image for image in images])
    elif request.method == "POST":
        # convert request payload to dict
        image = request.get_json()  # assume request payload is json
        image["_id"] = image.pop("id")
        inserted_id = images_collection.insert_one(image).inserted_id
        return {"inserted_id": inserted_id}
