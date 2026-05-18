import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
from io import BytesIO
import numpy as np

Image_size=224


def predict(model, img):
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)

    predictions = model.predict(img_array)
    confidence = round(100 * (np.max(predictions[0])), 2)

    if(predictions[0]>0.95 and confidence>95.00):
        predicted_class='Real'
    else:
        predicted_class='Fake'
    return predicted_class, confidence


def preprocess_image(image_data):
    image = Image.open(image_data)
    image=image.resize((Image_size,Image_size))
    np_image = np.array(image)
    return np_image

model=load_model(r"C:\Users\jaski\OneDrive\Desktop\Project final year\Project_MasterHR-main\Backend\Antispoofing\Model\1.h5")


image_path=r'C:\Users\jaski\OneDrive\Desktop\Project final year\Project_MasterHR-main\Backend\Antispoofing\sampleImages\WhatsApp Image 2024-07-01 at 23.56.02_53802bda.jpg'

image=preprocess_image(image_path)

predictedClass=predict(model,image)
print(predictedClass)
