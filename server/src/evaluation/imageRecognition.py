import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

import sys

from imageai.Classification import ImageClassification

execution_path = os.getcwd()


prediction = ImageClassification()
prediction.setModelTypeAsResNet50()
prediction.setModelPath(execution_path + "\src\evaluation\\resnet50_imagenet_tf.2.0.h5")
prediction.loadModel()

predictions, probabilities = prediction.predictImage(sys.argv[1], result_count=10)

for eachPrediction, eachProbability in zip(predictions, probabilities):
    print(eachPrediction , ":" , eachProbability)