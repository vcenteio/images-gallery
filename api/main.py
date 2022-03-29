import os

from flask import Flask, request
from flask_cors import CORS
import requests as rq
from dotenv import load_dotenv

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
