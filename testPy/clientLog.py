# ----- A simple TCP client program in Python using send() function -----

import socket


# Create a client socket

clientSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)


# Connect to the server

clientSocket.connect(("127.0.0.1", 10000))


# Send data to server


data = b'\x78\x78\x0d\x01\x01\x23\x45\x67\x89\x01\x23\x45\x00\x01\x8c\xdd\x0d\x0a'  # ok , login

clientSocket.send(data)  # ok , login


# Receive data from server

dataFromServer = clientSocket.recv(1024)
_int = int.from_bytes(dataFromServer, byteorder='big', signed=False)
print(_int)


# Print to the console

print(dataFromServer)  # mal
print(type(dataFromServer))
length = len(dataFromServer)  # ok
l = list(dataFromServer)
print(l)
res = ''.join(format(x, '02x') for x in l)
print(res)
print(type(res))
