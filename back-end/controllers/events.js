const Event = require('../models/Event');
const User = require('../models/User');
const Chat = require('../models/Chat');

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
  createEvent,
};
