const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/auth');
const chatsRoutes = require('./routes/chats');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// middlewares
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

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

io.on('connection', (socket) => {
  console.log('New client connected');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit('FromAPI', response);
};

app.get('/', (_req, res) => {
  res.send('Hello world!');
});

module.exports = server;
