import requests
import time
import random

lightStates = {}
nLights = 5


for i in range(nLights):
    lightStates[i] = False

print """ 1. getDeviceStatuses()
 2. getDeviceStatus(deviceId)
 3. setDeviceStatus(deviceId,state)
 4. setTemperature(val)
 5. setLuminosity(val)
 6. setPopulation(val)
	"""

while True:
	x = input()
	if x is 1:
		result = requests.get("http://localhost:5000/getDeviceStatuses")
		print result.content
	elif x is 2:
		i = input()
		result = requests.get("http://localhost:5000/getDeviceStatus?deviceId="+str(i))
		print result.content
	elif x is 3:
		s = input()
		t = raw_input()
		result = requests.get("http://localhost:5000/setDeviceStatus?deviceId="+str(s)+"&state="+t)
		print result.content
	elif x is 4:
		temp = input()
		result = requests.get("http://localhost:5000/setTemperature?val="+str(temp))
		print result.content
	elif x is 5:
		luminosity = input()
		result = requests.get("http://localhost:5000/setLuminosity?val="+str(luminosity))
		print result.content
	elif x is 6:
		nPeople = input()
		result = requests.get("http://localhost:5000/setPopulation?val="+str(nPeople))
		print result.content
