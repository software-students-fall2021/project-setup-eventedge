const {request} = require('./axios');
const {EVENTS: fakeEventsData} = require('../mock-data/events');
const Event = require('../models/Event');
const User = require('../models/User');
const Chat = require('../models/Chat');

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
  const {chatId} = req.body;

  const event = await Event.insertOne(req.body);
  const chat = await Chat.findById(chatId);
  const members = await User.find({_id: {$in: chat.users}});

  for (let i = 0; i < members.length; i++) {
    members[i].pendingEvents.push(event.id);
    members[i].save();
  }

  res.status(200).json({...req.body});
};

module.exports = {
  acceptPending,
  declinePending,
  getPendingEvents,
  createEvent,
  getAllEvents,
};
