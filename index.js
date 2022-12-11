const Gt06 = require("./gt06");
const net = require("net");
const PORT = 10000;
const PORT_MAIN = 10500;
const HOST = "127.0.0.1";

var client = new net.Socket();

client.on("close", function () {
  console.log("Connection closed");
});

function send_data(client, data) {
  client.connect(PORT_MAIN, HOST, function () {
    console.log("CONNECTED TO: " + HOST + ":" + PORT_MAIN);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
    console.log("envio mensaje ----:");
    const message = {
      name: "euge",
      edad: 50,
      grado: "aprendiendo",
    };
    client.write(data);
  });

  client.on("close", function () {
    console.log("Connection closed");
  });
}

const server = net.createServer();
server.listen(PORT, HOST, () => {
  console.log("TCP Server is running on port " + PORT + ".");
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

    // console.log(gt06.msgBuffer[0]);
    // console.log("lat", gt06.msgBuffer[0].lat); //ok

    gt06.msgBuffer.forEach((msg) => {
      console.log(msg);
    });
    send_data(client, JSON.stringify(gt06.msgBuffer[0]));
    //console.log("string", JSON.stringify(gt06.msgBuffer[0]));
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
