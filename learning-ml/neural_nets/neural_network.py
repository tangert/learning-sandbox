import numpy as np

class neural_network(object):

	def __init__(self):
		#define your hyperparameters here 
		#constants that establish the structure/behavior of network

		# basic neural network info
		self.inputLayerSize = 2
		self.outputLayerSize = 1
		self.hiddenLayerSize = 3

		# want to create random weights for w1, w2
		# syntax:
		# 	creates a random matrix of size AxB. So we want:
		# for W1: 2x3
		# for W2: 3x1 
		self.W1 = np.random.randn(self.inputLayerSize, self.hiddenLayerSize)
		self.W2 = np.random.randn(self.hiddenLayerSize, self.outputLayerSize)


	def forwardProp(self, X):
		# forward propogation
		# use matrix multiplication to simplify the operations.
		
		# formulas:
		# 1. z2 = X*W1, z is the sum of the input layers and their weights
		# 2. a2 = f(z2), applying activation function to given sum
		# 3. z3 = a2 * w2, or activity of
		# 	third layer = result from a2 * new weights connecting to the last neuron
		# 4. y = f(z3), applying last activation function to final sum

		# uses numpy's built in matrix multiplication methods
		self.z2 = np.dot(X, self.W1)
		self.a2 = self.sigmoid(self.z2)
		self.z3 = np.dot(self.a2, self.W2)

		yHat = self.sigmoid(self.z3)
		return yHat

	def sigmoid(self, z):
		return 1/(1+np.exp(-z))

	def sigmoidPrime(self, z):
		return np.exp(-z)/((1+np.exp(-z))**2)

	def backwardProp(self, X):
		

if __name__ == '__main__':
	
	X = np.array(([3,5],[5,1],[10,2]), dtype = float)
	Y = np.array(([75],[82],[93]), dtype = float)

	X /= np.amax(X, axis = 0)
	Y /= 100

	NN = neural_network()
	yHat = NN.forwardProp(X)
	# print(yHat)
	print(sum(0.5*(Y-yHat)**2))