const {request} = require('./axios');
const generateRandomInt = require('../utils/generate-random-int');
const DateGenerator = require('random-date-generator');

const acceptPending = (req, res) => {
  request()
    .post('/events.json')
    .then((data) => {
      res.status(200).json({message: 'event accepted', event: data});
    })
    .catch((e) => {
      console.error(e);
      const ID = generateRandomInt(0, 100);
      res.status(200).json({
        message: 'event accepted',
        id: ID,
        chatId: ID,
        date: DateGenerator.getRandomDate(),
        title: 'New event',
        location: 'New York City',
        chatTitle: 'Assimilated optimizing superstructure',
      });
    });
};

const declinePending = (req, res) => {
  request()
    .post('/events.json')
    .then((data) => {
      res.status(200).json({message: 'event declined', event: data});
    })
    .catch((e) => {
      console.error(e);
      const ID = generateRandomInt(0, 100);
      res.status(200).json({
        message: 'event declined',
        id: ID,
        chatId: ID,
        date: DateGenerator.getRandomDate(),
        title: 'New event',
        location: 'New York City',
        chatTitle: 'Assimilated optimizing superstructure',
      });
    });
};

module.exports = {
  acceptPending,
  declinePending,
};
