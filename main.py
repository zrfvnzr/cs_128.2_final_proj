
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

# The following line is the one responsible for actually loading the model
# we need to define f1_score and pass it in custom_objects to load the model properly
loadedModel = keras.models.load_model(model_path, custom_objects={'f1_score': f1_score})

import urllib.request
import io
def preprocess(url):
  image_data = urllib.request.urlopen(url).read()
  img = Image.open(io.BytesIO(image_data))
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

app = Flask(__name__)

@app.route('/')
def index():
  return "Hello world!"

# test post route to make sure there are no CORS errors
@app.post('/post')
def post_post():
  return "Post!"

@app.route('/api/predict', methods=['POST'])
def predict_post():
  data = request.get_json()
  url = data.get('field')
  reshaped = preprocess(url)
  prediction = predict(reshaped)
  result = {
    'result': prediction
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