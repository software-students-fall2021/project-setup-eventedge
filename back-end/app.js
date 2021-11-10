const express = require('express');
const http = require('http');
// const socketIo = require('socket.io');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const eventsRoutes = require('./routes/events');
const chatsRoutes = require('./routes/chats');
const usersRoutes = require('./routes/users');
const createSocket = require('./routes/socket')
require('dotenv').config();

const app = express();

// middlewares
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// routes
app.use('/auth', authRoutes);
app.use('/events', eventsRoutes);
app.use('/chats', chatsRoutes);
app.use('/events', eventsRoutes);
app.use('/users', usersRoutes);

const server = http.createServer(app);

createSocket(server)

app.get('/', (_req, res) => {
  res.send('Hello world!');
});

module.exports = server;
