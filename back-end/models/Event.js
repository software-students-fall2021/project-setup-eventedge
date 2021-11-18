const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {type: String, required: [true, "can't be blank"]},
  eventDate: {type: Date, required: true},
  eventTime: {type: String, required: true},
  location: {type: String, required: true},
  eventDescription: {type: String, required: true},
  chatId: {type: String, required: true},
});

module.exports = mongoose.model('Event', eventSchema);
