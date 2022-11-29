// creating server instance with dependency injection
const createAppInstance = ({connectionUri}) => {
  const express = require('express');
  const http = require('http');
  const cors = require('cors');
  const passport = require('passport');
  const {jwtStrategy} = require('./configs/jwt-strategy');
  const errorHandler = require('./middlewares/error-handler');
  const authRoutes = require('./routes/auth');
  const eventsRoutes = require('./routes/events');
  const chatsRoutes = require('./routes/chats');
  const usersRoutes = require('./routes/users');
  const createSocket = require('./routes/socket');
  const emailRoutes = require('./routes/email');

  require('./db')(connectionUri);

  const app = express();

  // middlewares
  app.use(passport.initialize());
  passport.use(jwtStrategy);
  app.use(cors());
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());

  // routes
  app.use('/email', emailRoutes);
  app.use('/auth', authRoutes);
  app.use('/events', eventsRoutes);
  app.use('/chats', chatsRoutes);
  app.use('/events', eventsRoutes);
  app.use('/users', usersRoutes);

  app.use(errorHandler);

  const server = http.createServer(app);

  createSocket(server);

  return server;
};

module.exports = createAppInstance;
