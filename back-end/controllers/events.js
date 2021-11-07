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

const getEventsPending = async (_, res) => {
  res.send(fakeEventsData);
};

const createEvent = async (req, res) => {
  //data from form
  const eventName = req.body.eventName;
  const mdy = req.body.mdy;
  const eventTime = req.body.eventTime;
  const locationSearch = req.body.locationSearch;
  const eventDescription = req.body.eventDescription;
  res.status(200).json({
    eventName: eventName,
    mdy: mdy,
    eventTime: eventTime,
    locationSearch: locationSearch,
    eventDescription: eventDescription,
  });
};

module.exports = {
  acceptPending,
  declinePending,
  getEventsPending,
  createEvent,
};
