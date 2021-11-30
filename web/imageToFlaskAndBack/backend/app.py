# backend/app.py

import os
from flask import Flask, render_template, request
from reverseProxy import proxyRequest
from classifier import classifyImage

MODE = os.getenv('FLASK_ENV')
DEV_SERVER_URL = 'http://localhost:3000/'

app = Flask(__name__)

# Ignore static folder in development mode.
if MODE == "development":
    app = Flask(__name__, static_folder=None)

def transform_image(infile):
    input_transforms = [transforms.Resize(255),           
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406],       
            [0.229, 0.224, 0.225])]
    my_transforms = transforms.Compose(input_transforms)
    image = Image.open(infile)                            
    timg = my_transforms(image)                           
    timg.unsqueeze_(0)                                    
    return timg


# Get a prediction
def get_prediction(input_tensor):
    outputs = model.forward(input_tensor)  
    pred = outputs.argmax(dim=1, keepdim=True)                                       
    return prediction

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
        # result = model(file.float())
        result = classifyImage(file)
        print('Model classification: ' + result)        
        return result