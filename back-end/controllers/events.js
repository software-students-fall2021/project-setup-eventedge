const Event = require('../models/Event');
const User = require('../models/User');
const Chat = require('../models/Chat');
const acceptPending = (req, res) => {
  //assuming events array in user schema contains both pending and accepted
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if (err) console.log(err);
    else {
      for (let i = 0; i < foundUser.pendingEvents.length; i++) {
        if (foundUser.pendingEvents[i] == req.body.eventId) {
          acceptedEvents.push(req.body.eventId)
          pendingEvents.splice(i, 1)
          break
        }
      }
      foundUser.save();
      res.status(200).json(foundUser);
    }
  });
};
const declinePending = async (req, res) => {
  //assuming events array in user schema contains both pending and accepted
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if (err) res.send(err);
    else {
      for (let i = 0; i < foundUser.events.length; i++) {
        if (foundUser.events[i] == req.body.eventId) {
          foundUser.pendingEvents.splice(i, 1);
          foundUser.save();
          break;
        }
      }
      res.status(200).json(foundUser);
    }
  });
};
const getPendingEvents = async (req, res) => {
  //assuming events array in user schema contains both pending and accepted
  try {
    const user = await User.findById(req.body.user.id);
    const events = await Event.find({ '_id': { $in: user.pendingEvents } });
    res.status(200).json(events);
  } catch (e) {
    console.error(e)
  }
};

const getAllEvents = async (req, res) => {
  try {
    const user = await User.findById(req.body.user.id);
    const events = await Event.find({ '_id': { $in: user.acceptedEvents } });
    res.status(200).json(events);
  } catch (e) {
    console.error(e)
  }
};
const createEvent = async (req, res) => {
  try {
    const {name, date, time, location, description, chatId} = req.body;

    const event = await Event.insertOne(
      {
        eventName: name, 
        eventDate: date,
        eventTime: time,
        location: location,
        eventDescription: description,
        chatId: chatId
      }
    )
    const chat = await Chat.findById(chatId)
    const members = await User.find({_id: {$in: chat.users}})
    for (let i = 0; i < members.length; i++) {
      members[i].pendingEvents.push(event.id)
      members[i].save()
    }


    res.status(200).json({
      name,
      date,
      time,
      location,
      description,
      chatId,
    });
  } catch (e) {
    console.error(e)
  }
};

module.exports = {
  acceptPending,
  declinePending,
  getPendingEvents,
  createEvent,
  getAllEvents,
};
