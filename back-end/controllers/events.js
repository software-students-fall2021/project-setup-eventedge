//const {request} = require('./axios');
const { Events } = require('../models/Event')
const { Users } = require('../models/User')
//const {EVENTS: fakeEventsData} = require('../mock-data/events');
//const generateRandomInt = require('../utils/generate-random-int');
//const { usersService } = require('../../front-end/src/lib/services/users-service');

const acceptPending = (req, res) => { //assuming events array in user schema contains both pending and accepted
  Users.findOne({username: req.body.username}, (err, foundUser) => {
    if (err) console.log(err);
    else {
      for (let i = 0; i < foundUser.events.length; i++) {
        if (foundUser.events[i] == req.body.eventId) {
          Events.findOne({id: req.body.eventId}, (err, foundEvent) => {
            if (err) console.log(err);
            else {
              foundEvent.isPending = false
              foundEvent.save()
            }
          })
        }
      }
    }
  })

}
  
const declinePending = (req, res) => { //assuming events array in user schema contains both pending and accepted
  Users.findOne({username: req.body.username}, (err, foundUser) => {
    if (err) res.send(err);
    else {
      for (let i = 0; i < foundUser.events.length; i++) {
        if (foundUser.events[i] == req.body.eventId) {
          foundUser.events.splice(i, 1)
          foundUser.save()
          break
        } 
      }
      res.status(200).json(foundUser)
    }
  })
}

const getPendingEvents = async (req, res) => { //assuming events array in user schema contains both pending and accepted
  let pendingEvents = []
  Users.findOne({username: req.session.username}, (err, foundUser) => {
    if (err) console.log(err);
    else {
      foundUser.events.forEach(eventId => {
        Events.findOne({id: eventId}, (err, foundEvent) => {
          if (err) console.log(err);
          else {
            if (foundEvent.isPending) pendingEvents.push(foundEvent)
          }
        })
      });
      res.status(200).json(pendingEvents)
    }
  })
  }

const getAllUserEvents = async (req, res) => {
    Users.findOne({username: req.session.username}, (err, foundUser) => {
      if (err) console.log(err);
      else {
        res.status(200).json(foundUser.events)
      }
    })
  }

const getAllEventsInChat = async (req, res) => {
    Events.find({chatId: req.params.id}, (err, foundEvents) => { //chatId passed into param?
      if (err) console.log(err);
      else res.status(200).json(foundEvents)
    })
}

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
  getAllUserEvents,
  getAllEventsInChat
};
