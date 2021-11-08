const {request} = require('./axios');
const {USERS: fakeUsers} = require('../mock-data/user');

const getAllUsers = (_, res) =>
  request()
    .get('/members.json')
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      console.error(e);
      // mockaroo limit reached
      res.send(fakeUsers);
    });

module.exports = {
  getAllUsers,
};
