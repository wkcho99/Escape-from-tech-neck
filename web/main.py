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

img_class_map = None
mapping_file_path = 'index_to_name.json'                  
if os.path.isfile(mapping_file_path):
    with open (mapping_file_path) as f:
        img_class_map = json.load(f)



# Transform input into the form our model expects
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
            class_id, class_name = render_prediction(prediction_idx)
            return jsonify({'class_id': class_id, 'class_name': class_name})


if __name__ == '__main__':
    app.run()