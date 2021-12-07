const Event = require('../models/Event');
const User = require('../models/User');
const Chat = require('../models/Chat');

const acceptPending = async (req, res) => {
  const {user} = req;
  const eventId = req.body.eventId;

  if (!user.pendingEvents.includes(eventId)) {
    return res.status(401).json({error: 'Unauthorized'});
  }

  const event = await Event.findOne(
    {_id: eventId},
    {_id: 0, id: '$_id', date: 1, name: 1}
  );

  await User.updateOne(
    {_id: user.id},
    {
      $push: {acceptedEvents: eventId},
      $pull: {pendingEvents: eventId},
    }
  );

  return res.status(200).json(event);
};

const declinePending = async (req, res) => {
  const {user} = req;
  const eventId = req.body.eventId;

  if (!user.pendingEvents.includes(eventId)) {
    return res.status(401).json({error: 'Unauthorized'});
  }

  const event = await Event.findOne(
    {_id: eventId},
    {_id: 0, id: '$_id', date: 1, name: 1}
  );

  await User.updateOne({_id: user.id}, {$pull: {pendingEvents: eventId}});

  return res.status(200).json(event);
};

const getPendingEvents = async (req, res) => {
  try {
    const events = await Event.find(
      {_id: {$in: req.user.pendingEvents}},
      {_id: 0, id: '$_id', date: 1, name: 1},
      {sort: '-createdAt'}
    );

    res.status(200).json(events);
  } catch (e) {
    console.error(e);
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find(
      {_id: {$in: req.user.acceptedEvents}},
      {_id: 0, id: '$_id', date: 1, name: 1, chatId: 1},
      {sort: '-createdAt'}
    );

    res.status(200).json(events);
  } catch (e) {
    console.error(e);
  }
};

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
