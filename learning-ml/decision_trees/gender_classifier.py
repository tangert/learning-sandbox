from sklearn import tree

# uses a decision tree
# uses HEIGHT, WEIGHT, and SHOE SIZE to determine gender

body_measurements = [
[181, 80, 44], [177, 70, 43], [160, 60, 38], [154, 54, 37],
[166, 65, 40], [190, 90, 47], [175, 64, 39], [177, 70, 40],
[159, 55, 37], [171, 75, 42], [181, 85, 43]]

genders = ['male', 'male', 'female', 'female', 'male', 'male', 'female', 'female',
     'female', 'male', 'male']

classifier = tree.DecisionTreeClassifier()
classifier = classifier.fit(body_measurements, genders)

def classify(input):
	prediction  = classifier.predict(input)
	print(prediction)

if __name__ == '__main__':
	classify([190,95,48])