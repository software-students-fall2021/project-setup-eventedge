const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const chatsRoutes = require('./routes/chats');
require('dotenv').config();

const app = express();

// middlewares
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// routes
app.use('/auth', authRoutes);
app.use('/chats', chatsRoutes);

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

let interval;

let msgs = {};

io.on('connection', (socket) => {
  let i = 1;
  console.log('New client connected', i);
  i++;

  socket.on('joinRoom', ({username, chatId}) => {
    console.log(username, chatId);
    socket.join(chatId);
    // const join = username + " read"
    // socket.broadcast.to(chatId).emit('joinMessage',join)
  });

  socket.on('retrieveMsgs', ({chatId}) => {
    io.to(chatId).emit('retrieveMsgs', msgs[chatId]);
  });

  socket.on('sendMsg', ({msgObj, chatId}) => {
    console.log('sendMsg');
    console.log(msgObj, chatId);
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
