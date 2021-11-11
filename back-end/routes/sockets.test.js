const {createServer} = require('http');
const Client = require('socket.io-client');
const {expect} = require('chai');
const createSocket = require('./socket');

const makeServer = () => {
  const httpServer = createServer();
  createSocket(httpServer);
  httpServer.listen(8000, () => {
    console.log('listening on 8000');
  });

  return httpServer;
};

describe('Socket test', () => {
  let server;
  let sockets;

  beforeEach(() => {
    sockets = [];
    server = makeServer();
  });

  afterEach(() => {
    server.close();
    sockets.forEach((e) => e.disconnect());
  });

  const makeSocket = (id = 0) => {
    const socket = Client.connect('http://localhost:8000', {
      reconnectionDelay: 0,
      'force new connection': true,
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log(`client ${id} connected`);
    });

    socket.on('disconnect', () => {
      console.log(`client ${id} disconnected`);
    });

    sockets.push(socket);

    return socket;
  };

  it('should receive null when user joins room initially', () => {
    const socket = makeSocket();

    socket.emit('joinRoom', {username: 'test', chatId: 1});
    socket.emit('retrieveMsgs', {chatId: 1});
    socket.on('retrieveMsgs', (msgs) => {
      expect(msgs).to.equal(null);
    });
  });

  it('should send and receive message', () => {
    const socketOneId = 1;
    const socketTwoId = 2;
    const socketOne = makeSocket(socketOneId);
    const socketTwo = makeSocket(socketTwoId);

    socketOne.emit('joinRoom', {username: socketOneId, chatId: 1});
    socketTwo.emit('joinRoom', {username: socketTwoId, chatId: 1});

    const testMessage = {
      username: socketOneId,
      message: socketOneId,
      date: '1',
    };

    return Promise.all([
      new Promise((resolve, _reject) => {
        socketOne.emit('sendMsg', {msgObj: testMessage, chatId: 1});
        resolve();
      }),
      new Promise((resolve, _reject) => {
        socketTwo.emit('retrieveMsgs', {chatId: 1});
        socketTwo.on('retrieveMsgs', (msgs) => {
          expect(msgs[0]).to.deep.equal(testMessage);
          resolve();
        });
      }),
    ]);
  });
});
