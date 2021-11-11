const mongoose = require('mongoose');

mongoose.connect(process.env.URI);
const database = mongoose.connection;

database.on('open', console.log.bind(console, 'Connection to DB is open'));
database.on('close', console.log.bind(console, 'Connection to DB is closed'));
database.on(
  'error',
  console.error.bind(console, 'An error occurred while connecting to the DB')
);

module.exports = database;
