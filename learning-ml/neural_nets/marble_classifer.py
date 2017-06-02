import numpy as np 


class marble_classifer(object):

	def __init__(self):
		self.inputLayerSize = 1
		self.hiddenLayerSize = 1
		self.outputLayerSize = 1


	# Calculates force in Newtons.
	def force(self, m):
		m*(9.8)