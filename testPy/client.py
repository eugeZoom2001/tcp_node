# ----- A simple TCP client program in Python using send() function -----

import socket


# Create a client socket

clientSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)


# Connect to the server

clientSocket.connect(("127.0.0.1", 10000))


# Send data to server

#data = bytearray("78 78 0D 01 01 23 45 67 89 01 23 45 00 01 8C DD 0D 0A",16)
data = b'\x78\x78\x0d\x01\x01\x23\x45\x67\x89\x01\x23\x46\x00\x01\x8c\xdd\x0d\x0a'  # ok , login

clientSocket.send(data)  # ok , login


# Receive data from server

dataFromServer = clientSocket.recv(1024)


# Print to the console

print(dataFromServer)  # mal
print(type(dataFromServer))
print(bytearray(dataFromServer))

l = list(dataFromServer)
print(l)
res = ''.join(format(x, '02x') for x in l)
print(res)
print(type(res))
