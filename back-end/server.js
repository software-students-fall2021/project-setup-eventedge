require('dotenv').config();

const app = require('./app')({connectionUri: process.env.URI});

const port = 8000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const close = () => server.close();

module.exports = {close};
