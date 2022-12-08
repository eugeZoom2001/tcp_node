import socketserver


class Handler_TCPServer(socketserver.BaseRequestHandler):
    """
    The TCP Server class for demonstration.

    Note: We need to implement the Handle method to exchange data
    with TCP client.

    """

    def handle(self):
        # self.request - TCP socket connected to the client
        self.data = self.request.recv(1024).strip()
        print("{} sent:".format(self.client_address[0]))
        print(self.data)
        print(type(self.data))
        _bytes = int.from_bytes(self.data, byteorder='little', signed=False)
        print(_bytes)
        # just send back ACK for data arrival confirmation
        self.request.sendall("ACK from TCP Server".encode())


if __name__ == "__main__":
    HOST, PORT = "localhost", 10000

    # Init the TCP server object, bind it to the localhost on 10000 port
    tcp_server = socketserver.TCPServer((HOST, PORT), Handler_TCPServer)

    # Activate the TCP server.
    # To abort the TCP server, press Ctrl-C.
    tcp_server.serve_forever()
