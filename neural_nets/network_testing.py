import numpy as np

def main():
	print("test")

	X = np.array(([3,5],[5,1],[10,2]), dtype = float)
	Y = np.array(([75],[82],[93]), dtype = float)

	X /= np.amax(X, axis = 0)
	Y /= 100

if __name__ == '__main__':
	main()
	NN = neural_network()
	yHat = NN.forward(X)
	print(yHat)