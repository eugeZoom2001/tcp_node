// Get net module
const net = require("net");

//Configuration ===================================
const PORT = 10500;
//=================================================

//Create an instance of the server and attach the client handling callback
const server = net.createServer(onClientConnection);

//Start listening on given port and host.
server.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});

//the client handling callback
function onClientConnection(sock) {
  //Log when a client connnects.
  console.log(`${sock.remoteAddress}:${sock.remotePort} Connected`);

  //Handle the client data.
  sock.on("data", function (data) {
    //Log data received from the client
    //console.log(`>> data received : ${data} `);
    console.log("main");
    console.log(` ${data} `);
    console.log(typeof data);
    //console.log("imei ", data.imei);

    //prepare and send a response to the client

    //close the connection
    sock.end();
  });

  //Handle when client connection is closed
  sock.on("close", function () {
    console.log(`${sock.remoteAddress}:${sock.remotePort} Connection closed`);
  });

  //Handle Client connection error.
  sock.on("error", function (error) {
    console.error(
      `${sock.remoteAddress}:${sock.remotePort} Connection Error ${error}`
    );
  });
}
