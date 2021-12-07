# backend/app.py
from __future__ import print_function # In python 2.7
import os
import io
import json
import sys
import numpy as np
from flask import Flask, render_template, request, session
from PIL import Image
import torch.nn as nn
import torch
from torchvision import models
from model import Temp_model
from reverseProxy import proxyRequest

# from predict import get_prediction, transform_image

MODE = os.getenv('FLASK_ENV')
DEV_SERVER_URL = 'http://localhost:3000/'

model = Temp_model()
model.load_state_dict(torch.load('/home/bastian_preisel/gitProjects/Escape-from-tech-neck/web/imageToFlaskAndBack/backend/model_weights.pth'), strict=False)
model.eval()
# logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)

# Ignore static folder in development mode.
if MODE == "development":
    app = Flask(__name__, static_folder=None)

# Transform input into the form our model expects
def transform_image(infile, side):
    image = Image.open(infile)
    image = image.resize((80, 60))

    # if image is from left sideview, image would be fliped(not used now)
    # if side is True:
    #         image = image.transpose(Image.FLIP_LEFT_RIGHT)

    imgarr = np.array(image)
    image = np.transpose(image, (2, 0, 1))

    # remove transparency 
    image = image[:3,:,:]
    image = torch.from_numpy(image)
    image = image.unsqueeze(0)                        
    return image

# Get a prediction
def get_prediction(input_tensor):
    outputs = model.forward(input_tensor)  
    pred = outputs.argmax(dim=1, keepdim=True)                                       
    return pred

# Make the prediction human-readable
def render_prediction(prediction_idx):
    stridx = str(prediction_idx)
    class_name = 'Unknown'
    if img_class_map is not None:
        if stridx in img_class_map is not None:
            class_name = img_class_map[stridx][1]

    return prediction_idx, class_name


app.secret_key = 'dljsaklqk24e21cjn!Ew@@dsa5'

@app.route('/')
@app.route('/<path:path>')
def index(path=''):
    if MODE == 'development':
        return proxyRequest(DEV_SERVER_URL, path)
    else:
        return render_template("index.html") 

@app.route('/classify', methods=['POST'])
def classify():
    if (request.files['image']): 
        file = request.files['image']
        input_tensor = transform_image(file, True)
        prediction_idx = get_prediction(input_tensor.float())
        sensitivity = session.get('sensitivity', None)
        position = session.get('position', None)
        return str(prediction_idx)

@app.route('/options', methods=['POST'])
def getOptions():
  sensitivity = request.json['sensitivity']
  position = request.json['position']
  session['position'] = position
  session['sensitivity'] = sensitivity
  # print(request.json['position'], file=sys.stderr)
  return "sample text"