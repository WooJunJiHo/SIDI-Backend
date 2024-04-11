from flask import Flask, request, jsonify
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import tensorflow as tf
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 모든 origin에서의 요청 허용

# 모델 불러오기
model = tf.keras.models.load_model('./models/SIDI_Best_model.h5')

@app.route('/')
def hello():
    return 'Hello, World!'

# 이미지 전처리 함수
def preprocess_image(image_path):
    image = load_img(image_path, target_size=(224, 224))
    image = img_to_array(image)
    image = image / 255.0
    image = np.expand_dims(image, axis=0)
    return image

# 예측 엔드포인트
@app.route('/predict', methods=['GET'])
def predict():
    # 이미지 전처리
    image_path = './iPhone12.jpg'
    preprocessed_image = preprocess_image(image_path)

    # 예측
    predictions = model.predict(preprocessed_image)

    # 결과 반환
    predicted_class = np.argmax(predictions)
    return jsonify({'predicted_class': int(predicted_class)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
