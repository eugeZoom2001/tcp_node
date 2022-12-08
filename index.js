const Gt06 = require("./gt06");
const net = require("net");
const port = 10000;
//const host = "157.230.225.243";
const host = "127.0.0.1";
const server = net.createServer();
server.listen(port, host, () => {
  console.log("TCP Server is running on port " + port + ".");
});

let sockets = [];

server.on("connection", function (sock) {
  console.log("CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort);
  //sockets.push(sock);
  var gt06 = new Gt06();

  sock.on("data", function (data) {
    console.log("hay datos");
    console.log(data);
    gt06.parse(data);
    if (gt06.expectsResponse) {
      sock.write(gt06.responseMsg);
    }

    // console.log(sock.imei);

    gt06.msgBuffer.forEach((msg) => {
      console.log(msg);
    });

    gt06.clearMsgBuffer();
    console.log("------------------- fin ---------------------------------");

    //     console.log("DATA " + sock.remoteAddress + ": " + data);

    // Write the data back to all the connected, the client will receive it as data from the server
    //     sockets.forEach(function (sock, index, array) {
    //       sock.write(
    //         sock.remoteAddress + ":" + sock.remotePort + " said " + data + "\n"
    //       );
    //     });
  });

  // Add a 'close' event handler to this instance of socket
  sock.on("close", function (data) {
    let index = sockets.findIndex(function (o) {
      return (
        o.remoteAddress === sock.remoteAddress &&
        o.remotePort === sock.remotePort
      );
    });
    if (index !== -1) sockets.splice(index, 1);
    console.log("CLOSED: " + sock.remoteAddress + " " + sock.remotePort);
  });
});
