const {request} = require('./axios');
const generateRandomInt = require('../utils/generate-random-int');
const DateGenerator = require('random-date-generator');
const {EVENTS: fakeEventsData} = require('../mock-data/events');

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

const getPendingEvents = async (_, res) =>
  request()
    .get('/events.json')
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      console.error(e);
      res.send(fakeEventsData)
    });

const createEvent = async (req, res) => {
  // data from form
  const {eventName, eventDate, eventTime, location, eventDescription} = req.body;

  res.status(200).json({
    eventName,
    eventDate,
    eventTime,
    location,
    eventDescription,
  });
};

module.exports = {
  acceptPending,
  declinePending,
  getPendingEvents,
  createEvent,
};
