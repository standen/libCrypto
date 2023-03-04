import random
from encoding import passwordSymbols

def passGer(length, sym=True): # in: int/bool, out: str
	out = ''
	mode = 4 if sym else 3
	length = [i for i in range(length)]
	random.shuffle(length)
	for i in length:
		if (i % mode == 0):
			out += passwordSymbols[0][random.randint(0, len(passwordSymbols[0]) - 1)]
		elif (i % mode == 1):
			out += passwordSymbols[1][random.randint(0, len(passwordSymbols[1]) - 1)]
		elif (i % mode == 2):
			out += passwordSymbols[2][random.randint(0, len(passwordSymbols[2]) - 1)]
		else:
			out += passwordSymbols[3][random.randint(0, len(passwordSymbols[3]) - 1)]
	return out