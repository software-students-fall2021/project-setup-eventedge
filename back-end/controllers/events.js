const {request} = require('./axios');
const {EVENTS: fakeEventsData} = require('../mock-data/events');

const acceptPending = (req, res) =>
  request()
    .post('/events.json')
    .then((data) => {
      res
        .status(200)
        .json({message: 'accepted', event: {...data, id: req.body.id}});
    })
    .catch((e) => {
      console.error(e);
      res.status(200).json({
        message: 'accepted',
        event: {
          ...fakeEventsData[0],
          id: req.body.id,
        },
      });
    });

const declinePending = (req, res) =>
  request()
    .post('/events.json')
    .then((data) => {
      res
        .status(200)
        .json({message: 'declined', event: {...data, id: req.body.id}});
    })
    .catch((e) => {
      console.error(e);
      res.status(200).json({
        message: 'declined',
        event: {
          ...fakeEventsData[0],
          id: req.body.id,
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
      res.send(fakeEventsData);
    });

const getAllEvents = async (_, res) =>
  request()
    .get('/events.json')
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      console.error(e);
      res.send(fakeEventsData);
    });

const createEvent = async (req, res) => {
  // data from form
  const {name, date, time, location, description} = req.body;

  res.status(200).json({
    name,
    date,
    time,
    location,
    description,
  });
};

module.exports = {
  acceptPending,
  declinePending,
  getPendingEvents,
  createEvent,
  getAllEvents,
};
