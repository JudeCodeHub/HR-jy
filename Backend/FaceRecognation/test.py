
import matplotlib.pyplot as plt
import numpy as np
import face_recognition
import cv2
import pickle


#Read input Image

img=cv2.imread("D:\my projects\MOBILE APPLICATIONS\HR\HR\Backend\FaceRecognation\WhatsApp Image 2024-06-01 at 00.41.16_edd1c6cd.jpg")
imgs=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)

#Load encoding FIle
file=open("EncodeFile.p",'rb')
encodelistknownwithnameandid=pickle.load(file)
file.close()


knownencodelist,Names,Ids=encodelistknownwithnameandid


face=face_recognition.face_locations(imgs)
encodecur_image=face_recognition.face_encodings(imgs,face)[0]


matches= face_recognition.compare_faces(knownencodelist,encodecur_image)
faceDis=face_recognition.face_distance(knownencodelist,encodecur_image)

index=np.where(faceDis==np.min(faceDis))[0][0]

#print("Matches",matches)
#print("Distance",faceDis)


print(Names)
if matches[index]:
    print("Face recognaized person:",Names[index])




