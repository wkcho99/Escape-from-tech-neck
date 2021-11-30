import io
import json
import os
import sys
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
from flask import Flask, jsonify, request

sys.path.append("Escape-from-tech-neck/model/model.py")

model = Temp_model()
model.load_state_dict(torch.load('/home/shinebobo/CSED402/Escape-from-tech-neck/model/model_weights.pth'), strict=False)
model.eval()                                              


# Transform input into the form our model expects
def transform_image(infile, side):
    image = Image.open(infile)                            
    image = image.resize((80, 60))
    if side is True:
            image = image.transpose(Image.FL)
    image = np.transpose(image, (2, 0, 1))                               
    return image


# Get a prediction
def get_prediction(input_tensor):
    outputs = model.forward(input_tensor)  
    pred = outputs.argmax(dim=1, keepdim=True)                                       
    return pred


@app.route('/', methods=['GET'])
def root():
    return jsonify({'msg' : 'Try POSTing to the /predict endpoint with an RGB image attachment'})


@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        file = request.files['file']
        if file is not None:
            input_tensor = transform_image(file)
            prediction_idx = get_prediction(input_tensor)
            return jsonify(prediction_idx)


if __name__ == '__main__':
    app.run()