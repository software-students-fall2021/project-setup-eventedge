const {createServer} = require('http');
const Client = require('socket.io-client');
const {expect} = require('chai');
const createSocket = require('./socket');
const mongoMock = require('../utils/test/mongodb-mock');
const Chat = require('../models/Chat');

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
  });

  beforeEach(() => {
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

  it('should receive initial messages in the database', async () => {
    const username = '5ca4bbc7a2dd94ee5816238c';
    const testMessage = {
      username,
      message: 'fdssdf',
      date: '11/11/2021 06:27 PM',
    };

    const {id} = await Chat.create({
      name: 'test',
      latestEvent: '',
      users: [username],
      messages: [testMessage],
    });

    const socket = makeSocket(username);

    return new Promise((resolve, _reject) => {
      socket.emit('joinRoom', {username, chatId: id});
      socket.emit('retrieveMsgs', {chatId: id});
      socket.on('retrieveMsgs', (msgs) => {
        expect(msgs).to.deep.equal([testMessage]);
        resolve();
      });
    });
  });

  it('should receive previously sent messages by other user', async () => {
    const socketOneId = '5ca4bbc7a2dd94ee5816238c';
    const socketTwoId = '5ca4bbc7a2dd94ee5816238d';
    const testMessage = {
      username: socketOneId,
      message: socketOneId,
      date: '11/11/2021 06:27 PM',
    };

    const {id} = await Chat.create({
      name: 'test',
      latestEvent: '',
      users: [socketOneId, socketTwoId],
      messages: [],
    });

    const socketOne = makeSocket(socketOneId);
    const socketTwo = makeSocket(socketTwoId);

    await new Promise((resolve, _reject) => {
      socketOne.emit('joinRoom', {username: socketOneId, chatId: id});
      socketOne.emit('sendMsg', {msgObj: testMessage, chatId: id});
      // need to set minimal timeout because writes to memory db take some time
      setTimeout(resolve, 20);
    });

    await new Promise((resolve, _reject) => {
      socketTwo.emit('joinRoom', {username: socketTwoId, chatId: id});
      socketTwo.emit('retrieveMsgs', {chatId: id});
      socketTwo.on('retrieveMsgs', (messages) => {
        expect(messages).to.deep.equal([testMessage]);
        resolve();
      });
    });
  });
});
