const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {type: String, required: [true, "can't be blank"]},
  date: {type: Date, required: [true, "can't be blank"]},
  time: {type: String, required: [true, "can't be blank"]},
  location: {type: String, required: [true, "can't be blank"]},
  description: {type: String, required: [true, "can't be blank"]},
  chatId: {type: String, required: [true, "can't be blank"]},
});

module.exports = mongoose.model('Event', eventSchema);
