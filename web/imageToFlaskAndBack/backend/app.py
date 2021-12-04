# backend/app.py

import os
import io
import json
import sys
import numpy as np
from flask import Flask, render_template, request
from reverseProxy import proxyRequest
from classifier import classifyImage
import cv2

import torch.nn as nn
import torch
from torchvision import models

from model import Temp_model

from PIL import Image

# sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
# from predict import get_prediction, transform_image

MODE = os.getenv('FLASK_ENV')
DEV_SERVER_URL = 'http://localhost:3000/'

model = Temp_model()
model.load_state_dict(torch.load('/home/bastian_preisel/gitProjects/Escape-from-tech-neck/model/model_weights.pth'), strict=False)
model.eval()
# logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)

# Transform input into the form our model expects
def transform_image(infile, side):
    # image = Image.open(infile)
    image = np.resize(infile, (3,60,80))
    # if side is True:
    #         image = image.transpose(Image.FL)
    # image = np.transpose(image, (2, 0, 1))                               
    return torch.Tensor(image)

# Get a prediction
def get_prediction(input_tensor):
    outputs = model.forward(input_tensor)  
    pred = outputs.argmax(dim=1, keepdim=True)                                       
    return pred

# Ignore static folder in development mode.
if MODE == "development":
    app = Flask(__name__, static_folder=None)

# Make the prediction human-readable
def render_prediction(prediction_idx):
    stridx = str(prediction_idx)
    class_name = 'Unknown'
    if img_class_map is not None:
        if stridx in img_class_map is not None:
            class_name = img_class_map[stridx][1]

    return prediction_idx, class_name

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
        npimg = np.fromfile(file, np.uint8)
        file = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
        # save(file)
        input_tensor = transform_image(file, True)
        prediction_idx = get_prediction(input_tensor)
        # result = classifyImage(file)
        # result = "test"
        
        #return str(input_tensor)
        return str(prediction_idx)