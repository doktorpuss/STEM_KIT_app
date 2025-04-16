import cv2
import numpy as np
import time

img = None

a=np.array([[1,2,3,4,5,6,7,8,9,10],[11,12,13,14,15,16,17,18,19,20]])
a=np.append(a,np.array([[1,2,3,4,5],[11,12,13,14,15]]),axis=1)
print(a.shape)
print(a)

cv2.namedWindow('Image', cv2.WINDOW_FULLSCREEN)

# img = cv2.imread('image.jpg')
# cv2.imshow('Image', img)
# time.sleep(10)
# cv2.waitKey(5000)
# print(img.shape[1])
# cv2.destroyAllWindows()
