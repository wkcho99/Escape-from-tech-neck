# flask_server.py

import torch
import numpy as np
from torchvision import transforms
from flask import Flask, jsonify, request
import sys
sys.path.append("Escape-from-tech-neck/model/model.py")

import model
import Temp_model


model = Temp_model()
model.load_state_dict(torch.load('Escape-from-tech-neck/model/model_weights.pth'), strict=False)
model.eval()

normalize = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.1307,), (0.3081,))])

app = Flask(__name__)
@app.route('/inference', methods=['POST'])
def inference():
    data = request.json
    _, result = model.forward(normalize(np.array(data['images'], dtype=np.uint8)).unsqueeze(0)).max(1)
    return str(result.item())


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=2431, threaded=False)

    # flask_test.py

    import json
    import requests
    import numpy as np
    from PIL import Image

    image = Image.open('test_image.jpg')
    pixels = np.array(image)

    headers = {'Content-Type': 'application/json'}
    address = "http://127.0.0.1:2431/inference"
    data = {'images': pixels.tolist()}

    result = requests.post(address, data=json.dumps(data), headers=headers)

    print(str(result.content, encoding='utf-8'))