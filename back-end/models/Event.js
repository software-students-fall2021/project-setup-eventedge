const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventDate: Date,
  eventTime: String,
  location: String,
  eventDescription: String,
  chatId: String,
  isPending: Boolean,
});

module.exports = mongoose.model('Event', eventSchema);
