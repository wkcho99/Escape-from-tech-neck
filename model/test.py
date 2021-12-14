from pandas.io.formats.format import Datetime64TZFormatter
import torch
import torch.nn as nn
from dataset import PoseDataset
from model import Temp_model
import torch.optim as optim
import numpy as np
# import torchsummary

TEST_DATA_DIR = "/home/shinebobo/CSED402/Escape-from-tech-neck/model/Image"
TEST_LABEL_DIR = "test.csv"
IMG_WIDTH = 80
IMG_HEIGHT = 60

test_data = PoseDataset(csv_file=TEST_LABEL_DIR, img_dir=TEST_DATA_DIR, input_width=IMG_WIDTH, input_height=IMG_HEIGHT)

test_loader = torch.utils.data.DataLoader(dataset=test_data, batch_size=1, shuffle=False)

model = Temp_model()
criterion = torch.nn.CrossEntropyLoss()

test_loss = 0
correct = 0
test_total = 0

model.load_state_dict(torch.load('/home/shinebobo/CSED402/Escape-from-tech-neck/model/100_model_weights.pth'))
model.eval()
# torchsummary.summary(model, (3, 80, 60),device='cpu')
with torch.no_grad():
    for i, (data, label) in enumerate(test_loader, 0):
        output = model(data.float())
        # target = torch.Tensor(np.zeros(5))
        
        # target[label] = 1
        # print(target)
        loss = criterion(output, label)
        test_loss += loss
        pred = output.argmax(dim=1, keepdim=True)

        if pred == label:
            correct += 1
        test_total += 1
        

print(f"Loss:{test_loss/test_total}")
print(f"Accuracy:{correct/test_total}")


