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

  if (!req.user.chats.includes(chatId)) {
    return res.status(401).json({error: 'Unauthorized'});
  }

  const event = await Event.create(req.body);
  const chat = await Chat.findById(chatId);

  await User.updateMany(
    {_id: {$in: chat.users}},
    {$push: {pendingEvents: event.id}}
  );

  return res.status(200).json({...req.body});
};

module.exports = {
  acceptPending,
  declinePending,
  getPendingEvents,
  createEvent,
  getAllEvents,
};
