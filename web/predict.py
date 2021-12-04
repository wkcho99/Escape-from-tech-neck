import io
import json
import os
import sys
import torch
from PIL import Image
from flask import Flask, jsonify, request

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from model.model import Temp_model

model = Temp_model()
model.load_state_dict(torch.load('/home/shinebobo/CSED402/Escape-from-tech-neck/model/model_weights.pth'), strict=False)
model.eval()                                              

# Transform input into the form our model expects
def transform_image(infile, side):
    image = Image.open(infile)                            
    image = image.resize((80, 60))
    # if side is True:
    #         image = image.transpose(Image.FL)
    image = np.transpose(image, (2, 0, 1))                               
    return image


# Get a prediction
def get_prediction(input_tensor):
    outputs = model.forward(input_tensor)  
    pred = outputs.argmax(dim=1, keepdim=True)                                       
    return pred

