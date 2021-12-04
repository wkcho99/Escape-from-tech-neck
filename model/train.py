import torch
import torch.nn as nn
from dataset import PoseDataset
from model import Temp_model
import torch.optim as optim
import numpy as np
import matplotlib.pyplot as plt

TRAIN_DATA_DIR = "Image"
TRAIN_LABEL_DIR = "train.csv"
IMG_WIDTH = 80
IMG_HEIGHT = 60
EPOCH = 200

train_data = PoseDataset(csv_file=TRAIN_LABEL_DIR, img_dir=TRAIN_DATA_DIR, input_width=IMG_WIDTH, input_height=IMG_HEIGHT)

train_loader = torch.utils.data.DataLoader(dataset=train_data, batch_size=10, shuffle=True)

model = Temp_model()
criterion = torch.nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr = 1e-6)

running_loss = 0
train_total = 0
loss_list = []
acu_list = []

model.train()
for epoch in range(EPOCH):
    correct = 0
    iter = 0
    for i, (data, label) in enumerate(train_loader, 0):
        optimizer.zero_grad()
        output = model(data.float())
        # target = torch.Tensor(np.zeros((label.shape[0], 5)))
        
        # for j in range(label.shape[0]):
        #     target[j, label[j]] = 1
        loss = criterion(output, label)
        
        for k in range(data.shape[0]):
            pred = output.argmax(dim=1, keepdim=True)
            if pred[k] == label[k]:
                correct += 1
            iter +=1
            
        loss.backward()
        optimizer.step()

        running_loss += loss
        train_total += 1

    print("Epoch: " + str(epoch + 1))
    print("Cls Average training loss: " + str(running_loss.item() / train_total))
    print("Accuracy: ", str(correct / iter) )
    
    loss_list.append(running_loss.item() / (train_total))
    acu_list.append(correct / iter)

    if (epoch+1)% 50 == 0:
        torch.save(model.state_dict(), 'model_weights.pth')
    

plt.plot(range(EPOCH), loss_list)
plt.savefig("LOSS.png")
plt.close()

plt.plot(range(EPOCH), acu_list)
plt.savefig("ACU.png")
plt.close()


torch.save(model.state_dict(), 'model_weights.pth')

