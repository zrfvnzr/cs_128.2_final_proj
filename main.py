
import numpy as np
from tensorflow import keras
import keras.backend as K
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from PIL import Image
import warnings
warnings.filterwarnings('ignore')

img_w, img_h = 225, 225
input_path = ''
model_path = './model.h5'

def f1_score(y_true, y_pred):
  true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
  possible_positives = K.sum(K.round(K.clip(y_true, 0, 1)))
  predicted_positives = K.sum(K.round(K.clip(y_pred, 0, 1)))
  precision = true_positives / (predicted_positives + K.epsilon())
  recall = true_positives / (possible_positives + K.epsilon())
  f1_val = 3*(precision*recall)/(precision+recall+K.epsilon())
  return f1_val

import os
import urllib.request

filename = "model.h5" # replace with your desired file name
url = "https://github.com/zrfvnzr/cs_128.2_final_proj/raw/flask/model.h5" # replace with the URL of the file you want to download

if not os.path.exists(filename):
    print(f"{filename} does not exist. Downloading...")
    urllib.request.urlretrieve(url, filename)
    print(f"{filename} downloaded.")
else:
    print(f"{filename} already exists.")

# The following line is the one responsible for actually loading the model
# we need to define f1_score and pass it in custom_objects to load the model properly
loadedModel = keras.models.load_model(model_path, custom_objects={'f1_score': f1_score})

def preprocess(img):
  # print('url is', url) # temp
  # response = requests.get(url)
  # img = Image.open(BytesIO(response.content)).convert('RGB')
  img = img.resize((img_w,img_h))
  # Convert the image to a NumPy array
  image_array = np.array(img)
  # Normalize the pixel values of the image array to the same range as the images used to train the loaded model
  normalized = image_array.astype('float32')
  normalized /= 255
  # Reshape the input array to have a rank of 4
  reshaped = np.reshape(normalized, (1, img_h, img_w, 3))
  # Data Augmentation
  datagen = ImageDataGenerator(
      featurewise_center=False,
      samplewise_center=False,
      featurewise_std_normalization=False,
      samplewise_std_normalization=False,
      zca_whitening=False,
      rotation_range=20.,
      width_shift_range=0.5,
      height_shift_range=0.5,
      shear_range=30.,
      zoom_range=0.,
      channel_shift_range=0.,
      fill_mode='nearest',
      cval=0.,
      horizontal_flip=0.2,
      vertical_flip=0.2,
      rescale=None)
  datagen.fit(reshaped)
  return reshaped


def predict(reshaped):
   # Pass the preprocessed image to the loaded model for prediction
  y_pred = (loadedModel.predict(reshaped) > 0.5).astype("int32")
  predicted_class = np.argmax(y_pred)
  prediction = ''
  target_names = ['Healthy', 'Caution', 'Severe']
  if target_names[predicted_class] == 'Healthy':
    prediction = 'Without Diabetic Retinopahy'
  else:
    prediction = 'With Diabetic Retinopathy'
  return prediction


from flask import Flask, jsonify, request
import io

app = Flask(__name__)

print('Flask running!')

@app.route('/')
def index():
  return "Hello world!"

# test post route to make sure there are no CORS errors
@app.post('/post')
def post_post():
  return "Post!"

@app.route('/api/predict', methods=['POST'])
def predict_post():
  try:

    # print('request.files is', request.files) # temp

    # check if the post request has the file part
    if 'file' not in request.files:
        return 'No file part in the request', 400

    file = request.files['file']
    # check if the file is empty
    if file.filename == '':
        return 'No file selected for processing', 400

    # Read image data from request body
    file_data = file.read()

    # Open image using PIL and perform some operation on it
    with Image.open(io.BytesIO(file_data)) as img:
        # img = img.rotate(45)
        # img_data = io.BytesIO()
        # img.save(img_data, format='JPEG')
        # img_data.seek(0)
    # Return processed image as response
    # return img_data.read(), 200, {'Content-Type': 'image/jpeg'}

      reshaped = preprocess(img)

    prediction = predict(reshaped)

    result = {
      'result': prediction
    }
    return jsonify(result)
  
  except Exception as e:
    print(e)
    result = {
      'result': "Error",
      'exception': e
    }
    return jsonify(result)

# example post route with json request body
# @app.route('/api/data', methods=['POST'])
# def process_data():
#     data = request.get_json()
#     field1 = data.get('field1')
#     field2 = data.get('field2')
#     field3 = data.get('field3')
#     # do something with the fields here
#     result = {'status': 'success', 'message': 'Data processed successfully'}
#     return jsonify(result)