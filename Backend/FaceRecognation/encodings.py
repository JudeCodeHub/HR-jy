import os
import base64
import pymongo
from io import BytesIO
from PIL import Image
import numpy as np
import face_recognition
import pickle

# Manual .env loader to avoid requiring extra pip packages
def load_env(filepath):
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, val = line.split('=', 1)
                    os.environ[key.strip()] = val.strip()

# Look for .env in current folder, parent folder, and root folder
load_env(".env")
if "DB_CONNECTION_STRING" not in os.environ:
    load_env("../.env")      # Look in parent folder (Backend/.env)
if "DB_CONNECTION_STRING" not in os.environ:
    load_env("../../.env")    # Look in root folder (Workspace/.env)

# Connect to MongoDB Atlas
db_uri = os.environ.get("DB_CONNECTION_STRING")
if not db_uri:
    raise ValueError("Error: DB_CONNECTION_STRING not found in environment or .env file.")

client = pymongo.MongoClient(db_uri)
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


