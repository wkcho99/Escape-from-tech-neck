import pandas as pd
import os
import random
import csv

CSV_DIR = "csv/"
IMAGE_DIR = ""
CSV_NAME = "train.csv"

def combine_csv(csv_dir = CSV_DIR, total_csv_name = CSV_NAME):
    csv_name_list = os.listdir(csv_dir)
    csv_list = []
    total_csv = pd.DataFrame(columns=["filename", "label"])
    
    for csv_name in csv_name_list:
        csv_temp = pd.read_csv(os.path.join(CSV_DIR,csv_name), index_col=0)
        csv_list.append(csv_temp)
    
    total_csv = pd.concat(csv_list, axis=0, ignore_index=True)
    
    total_csv.to_csv(CSV_NAME, index=False)
        
# combine_csv()

def make_test_csv(train_csv_dir = '/home/shinebobo/CSED402/model/train.csv', test_size = 200):
    train_csv = pd.read_csv(train_csv_dir)
    test_csv = open('test.csv','w',newline='')
    
    wr = csv.writer(test_csv)
    wr.writerow(['filename','label'])
    
    for i in range(test_size):
        r = random.randint(0, len(train_csv))
        wr.writerow([train_csv.iloc[r,0], train_csv.iloc[r,1]])
        print(train_csv.index[r])
        train_csv = train_csv.drop(train_csv.index[r])
    
    train_csv.to_csv("train.csv", index=False)
    test_csv.close()
    
    
make_test_csv()



# f = open('CWK.csv','w',newline='')
# wr = csv.writer(f)

# for i in range(50):
#     wr.writerow([i+1,'CWK'+str(i+1)+'.jpg',0])

# for i in range(50, 100):
#     wr.writerow([i+1,'CWK'+str(i+1)+'.jpg',1])
    
# for i in range(100, 150):
#     wr.writerow([i+1,'CWK'+str(i+1)+'.jpg',2])

# for i in range(150, 200):
#     wr.writerow([i+1,'CWK'+str(i+1)+'.jpg',3])

# for i in range(200, 250):
#     wr.writerow([i+1,'CWK'+str(i+1)+'.jpg',4])

# for i in range(250, 260):
#     wr.writerow([i+1,'CWK'+str(i+1)+'.jpg',1])

# f.close()
    
    