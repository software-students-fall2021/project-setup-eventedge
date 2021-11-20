require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const passport = require('passport');
const {jwtStrategy} = require('./configs/jwt-strategy');
const authRoutes = require('./routes/auth');
const eventsRoutes = require('./routes/events');
const chatsRoutes = require('./routes/chats');
const usersRoutes = require('./routes/users');
const createSocket = require('./routes/socket');

require('./db');

const app = express();

// middlewares
app.use(passport.initialize());
passport.use(jwtStrategy);
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

createSocket(server);

module.exports = server;
