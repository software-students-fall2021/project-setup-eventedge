const {createServer} = require('http');
const Client = require('socket.io-client');
const {expect} = require('chai');
const createSocket = require('./socket');
const mongoMock = require('../utils/test/mongodb-mock');

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

  before(async () => {
    await mongoMock.connectToDatabase();
  })

  beforeEach(async () => {
    sockets = [];
    server = makeServer();
  });

  afterEach(async () => {
    server.close();
    sockets.forEach((e) => e.disconnect());
    await mongoMock.clearDatabase();
  });

  after(async () => await mongoMock.closeDatabase());

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
    const chatId = '5bb9e79df82c0151fc0cd5c8';
    const socketOneId = 1;
    const socketTwoId = 2;
    const socketOne = makeSocket(socketOneId);
    const socketTwo = makeSocket(socketTwoId);

    socketOne.emit('joinRoom', {username: socketOneId, chatId});
    socketTwo.emit('joinRoom', {username: socketTwoId, chatId});

    const testMessage = {
      username: socketOneId,
      message: socketOneId,
      date: '1',
    };

    return Promise.all([
      new Promise((resolve, _reject) => {
        socketOne.emit('sendMsg', {msgObj: testMessage, chatId});
        resolve();
      }),
      new Promise((resolve, _reject) => {
        socketTwo.emit('retrieveMsgs', {chatId});
        socketTwo.on('retrieveMsgs', (msgs) => {
          expect(msgs[0]).to.deep.equal(testMessage);
          resolve();
        });
      }),
    ]);
  });
});
