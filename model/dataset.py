import torch
import pandas as pd
import os
import numpy as np
from torch.utils.data import Dataset
from PIL import ImageFile, Image

class PoseDataset(Dataset):
    def __init__(self, csv_file, img_dir, input_width, input_height, SIDE=False):
        self.labels = pd.read_csv(csv_file)
        self.img_dir = img_dir
        self.width = input_width
        self.height = input_height
        self.side = SIDE
        # if SIDE is T, camera is in left & if SIDE is F, camera is in right

    def __len__(self):
        return len(self.labels)
    
    def __getitem__(self, index):
        
        img_name = os.path.join(self.img_dir, self.labels.iloc[index, 0])
        image = Image.open(img_name)
        label = self.labels.iloc[index, 1]
        image = image.resize((80, 60))

        # If image is from left positioned camera
        if self.side is True:
            image = image.transpose(Image.FL)
            
        image = np.transpose(image, (2, 0, 1))
        data = {
            "image" : image,
            "label" : label
        }

    
        return image, label
