const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const chatsRoutes = require('./routes/chats');
const eventsRoutes = require('./routes/events');
require('dotenv').config();

const app = express();

// middlewares
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// routes
app.use('/auth', authRoutes);
app.use('/chats', chatsRoutes);
app.use('/events', eventsRoutes);

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

let msgs = {};

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', ({username, chatId}) => {
    console.log(username + ' joined');
    socket.join(chatId);
  });

  socket.on('retrieveMsgs', ({chatId}) => {
    io.to(chatId).emit('retrieveMsgs', msgs[chatId]);
  });

  socket.on('sendMsg', ({msgObj, chatId}) => {
    if (msgs.hasOwnProperty(chatId)) {
      const length = msgs[chatId].length;
      msgObj.id = length;
      msgs[chatId].push(msgObj);
    } else {
      msgs[chatId] = [msgObj];
    }
    io.to(chatId).emit('sendMsg', msgObj);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.get('/', (_req, res) => {
  res.send('Hello world!');
});

module.exports = server;
