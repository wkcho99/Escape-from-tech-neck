import cv2
import os
import time

PATH = "/home/shinebobo/CSED402/data"
PHOTOS_PER_MINUTE = 30
counter = 1

while True:
    cam = cv2.VideoCapture(0)
    check, img = cam.read()

    if check:
        cv2.namedWindow("cam-test", cv2.WINDOW_AUTOSIZE)
        cv2.imshow("cam-test",img)
        cv2.waitKey(1)
        cv2.destroyWindow("cam-test")
        filename = "testPhoto_"+str(counter)+".jpg"
        cv2.imwrite(os.PATH.join(PATH , filename),img)
        counter += 1
        print("Saved photo " + filename + " to " + PATH)
        time.sleep(60/PHOTOS_PER_MINUTE)

