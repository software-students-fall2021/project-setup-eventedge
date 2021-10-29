// import {app} from './app.js';

const app = require('./app')

const port = 8000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// export const close = () => server.close();
