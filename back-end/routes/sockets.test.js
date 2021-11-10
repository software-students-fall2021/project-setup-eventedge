const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const assert = require("chai").assert;
const createSocket = require('./socket')

describe("Socket Tests", () => {
  let io, serverSocket, clientSocket;

  beforeEach(() => {
    const httpServer = createServer();
    io = createSocket(httpServer)
    httpServer.listen(() => {
      console.log('here');
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      
      clientSocket.on("connect");
    });
  });

  afterEach(() => {
    io.close();
    clientSocket.close();
  });
  describe("Socket Tests", () => {
    it("should make client join room", () => {
        
        // clientSocket.emit("joinRoom", {username: 'isfar', chatId: 1});
        // serverSocket.emit('hello world')
        console.log(serverSocket);
        io.
        clientSocket.on('hello world', args => {
          console.log(args);
        })
        console.log(clientSocket);
        console.log("hey");
        assert(true)
        
      });
  })
  
});