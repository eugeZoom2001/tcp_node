# ----- A simple TCP client program in Python using send() function -----

import socket


# Create a client socket

clientSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)


# Connect to the server

clientSocket.connect(("127.0.0.1", 10000))


# Send data to server

#data = bytearray("78 78 0D 01 01 23 45 67 89 01 23 45 00 01 8C DD 0D 0A",16)
data = b'\x78\x78\x1f\x12\x0b\x08\x1d\x11\x2e\x10\xcc\x02\x7a\xc7\xeb\x0c\x46\x58\x49\x00\x14\x8f\x01\xcc\x00\x28\x7d\x00\x1f\xb8\x00\x03\x80\x81\x0d\x0a'
#ok , location
clientSocket.send(data)  # ok


# Receive data from server

dataFromServer = clientSocket.recv(2048)


# Print to the console

print(dataFromServer)  # mal
print(type(dataFromServer))
length = len(dataFromServer)
print(f'Length of this bytes object is {length}.')
