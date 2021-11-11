const socketIo = require('socket.io');
const socketControllers = require('../controllers/socket');

const createSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinRoom', ({username, chatId}) => {
      socketControllers.joinRoom(username, chatId, socket);
    });

    socket.on('retrieveMsgs', ({chatId}) => {
      socketControllers.retrieveMsgs(chatId, io);
    });

    socket.on('sendMsg', ({msgObj, chatId}) => {
      socketControllers.sendMsg(msgObj, chatId, io);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

module.exports = createSocket;
