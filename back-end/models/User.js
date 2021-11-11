const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  chats: [mongoose.Schema.ObjectId],
  events: [mongoose.Schema.ObjectId]
});

module.exports = mongoose.model('User', userSchema)