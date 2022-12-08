var net = require("net");

var HOST = "127.0.0.1";
var PORT = 10000;

var message = Buffer.from("78780A134401040001000508450D0A", "hex");
console.log(message);
var client = new net.Socket();
client.connect(PORT, HOST, function () {
  console.log("CONNECTED TO: " + HOST + ":" + PORT);
  // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
  console.log("mensaje ----:");
  console.log(message);
  client.write(message);
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on("data", function (data) {
  console.log(data);
  // Close the client socket completely
  client.destroy();
});

// Add a 'close' event handler for the client socket
client.on("close", function () {
  console.log("Connection closed");
});
