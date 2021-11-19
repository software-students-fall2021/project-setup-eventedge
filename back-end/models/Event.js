const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  time: String,
  location: String,
  description: String,
  chatId: String,
});

module.exports = mongoose.model('Event', eventSchema);
