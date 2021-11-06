const {request} = require('./axios');
const generateRandomInt = require('../utils/generate-random-int');
const DateGenerator = require('random-date-generator');

const acceptPending = (_, res) =>
  request()
    .post('/events.json')
    .then((data) => {
      res.status(200).json({message: 'event accepted', event: data});
    })
    .catch((e) => {
      console.error(e);
      res.status(200).json({
        message: 'event accepted',
        event: {
          id: generateRandomInt(0, 100),
          chatId: generateRandomInt(0, 100),
          date: DateGenerator.getRandomDate(),
          title: 'New event',
          location: 'New York City',
          chatTitle: 'Assimilated optimizing superstructure',
        },
      });
    });

const declinePending = (req, res) =>
  request()
    .post('/events.json')
    .then((data) => {
      res.status(200).json({message: 'event declined', event: data});
    })
    .catch((e) => {
      console.error(e);
      res.status(200).json({
        message: 'event declined',
        event: {
          id: generateRandomInt(0, 100),
          chatId: generateRandomInt(0, 100),
          date: DateGenerator.getRandomDate(),
          title: 'New event',
          location: 'New York City',
          chatTitle: 'Assimilated optimizing superstructure',
        },
      });
    });

module.exports = {
  acceptPending,
  declinePending,
};
