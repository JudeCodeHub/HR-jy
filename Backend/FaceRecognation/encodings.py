
import base64
import pymongo
from io import BytesIO
from PIL import Image
import numpy as np
import face_recognition
import pickle

# Connect to MongoDB Atlas
client = pymongo.MongoClient("mongodb://jasky:Jky210736@ac-iinjp0s-shard-00-00.bp5osz8.mongodb.net:27017,ac-iinjp0s-shard-00-01.bp5osz8.mongodb.net:27017,ac-iinjp0s-shard-00-02.bp5osz8.mongodb.net:27017/?ssl=true&replicaSet=atlas-ko562g-shard-0&authSource=admin&appName=Cluster1")


db=client["test"]
col=db["employeees"]

x=col.find()


#Function for find face_encodings
def findencodingss(imagelist):
    encodelist=[]

    for img in imagelist:
        
        encode=face_recognition.face_encodings(img)[0]
        encodelist.append(encode)
    return encodelist






#Code For store image,id ,name datas into array
Names=[]
Ids=[]
Images=[]
for data in x:
    try:
        uri=data["image"]
        base64_str=uri.split(",")[1]
        image_data=base64.b64decode(base64_str)

        image=Image.open(BytesIO(image_data))
        image=image.convert('RGB')
        np_image=np.array(image)

        # Check if face_recognition can find a face in the image
        encodings = face_recognition.face_encodings(np_image)
        if len(encodings) > 0:
            Names.append(data["Name"])
            Ids.append(data["_id"])
            Images.append(np_image)
            print(f"Loaded face for: {data['Name']}")
        else:
            print(f"Warning: No face found in image for user {data.get('Name', 'Unknown')} (ID: {data['_id']}). Skipping.")
    except Exception as e:
        print(f"Error processing entry for {data.get('Name', 'Unknown')}: {e}")

print(f"Successfully loaded {len(Images)} face(s).")
knownencodelist=findencodingss(Images)

encodelistknownwithnameid=[knownencodelist,Names,Ids]

file=open("EncodeFile.p",'wb')
pickle.dump(encodelistknownwithnameid,file)
file.close()


