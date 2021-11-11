const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  chats: Array,
  events: Array,
});

module.exports = mongoose.model('User', userSchema);
