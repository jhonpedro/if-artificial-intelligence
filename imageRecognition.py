import os

os.add_dll_directory("C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v10.1\\bin")
os.add_dll_directory("E:\Programs\cudnn-11.5-windows-x64-v8.3.0.98\\bin")

from imageai.Classification import ImageClassification

execution_path = os.getcwd()


prediction = ImageClassification()
prediction.setModelTypeAsResNet50()
prediction.setModelPath(execution_path + "\\resnet50_imagenet_tf.2.0.h5")
prediction.loadModel()

predictions, probabilities = prediction.predictImage(execution_path + "\car3.jpg", result_count=5)

for eachPrediction, eachProbability in zip(predictions, probabilities):
    print(eachPrediction , " : " , eachProbability)