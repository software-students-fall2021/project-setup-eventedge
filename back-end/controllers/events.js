const User = require('../models/User');

const acceptPending = (req, res) => {
  //assuming events array in user schema contains both pending and accepted
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if (err) console.log(err);
    else {
      for (let i = 0; i < foundUser.pendingEvents.length; i++) {
        if (foundUser.pendingEvents[i] == req.body.eventId) {
          acceptedEvents.push(req.body.eventId);
          pendingEvents.splice(i, 1);
          break;
        }
      }
      foundUser.save();
      res.status(200).json({
        accepted: foundUser.acceptedEvents,
        pending: foundUser.pendingEvents,
      });
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
      res.status(200).json({
        accepted: foundUser.acceptedEvents,
        pending: foundUser.pendingEvents,
      });
    }
  });
};

const getPendingEvents = async (req, res) => {
  //assuming events array in user schema contains both pending and accepted
  try {
    const user = await User.findById(req.body.user.id);
    const events = await Event.find({_id: {$in: user.pendingEvents}});
    res.status(200).json(events);
  } catch (e) {
    console.error(e);
  }
};

const getAllEvents = async (req, res) => {
  try {
    const user = await User.findById(req.body.user.id);
    const events = await Event.find({_id: {$in: user.acceptedEvents}});
    res.status(200).json(events);
  } catch (e) {
    console.error(e);
  }
};

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
