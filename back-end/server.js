const app = require('./app');

const port = 8000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const close = () => server.close();

module.exports = {close};
