const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  latestEvent: String,
  users: Array,
  messages: Array,
});

module.exports = mongoose.model('Chat', chatSchema);
