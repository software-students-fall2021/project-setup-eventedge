const User = require('../models/User');
const Chat = require('../models/Chat');

const getChats = async (req, res) => {
  try {
    const user = await User.findById(req.body.user.id);
    const chats = await Chat.find({_id: {$in: user.chats}});
    res.status(200).json(chats);
  } catch (e) {
    console.error(e);
  }
};

const getChatMembers = async (req, res) => {
  try {
    const users = await User.find({_id: {$in: Chat.user}});
    res.status(200).json({data: users.map((user) => user.username)});
  } catch (e) {
    console.error(e);
  }
};

const createChat = async (req, res) => {
  const {chatName, users} = req.body;
  res.status(200).json({
    chatName,
    users,
  });
};

module.exports = {
  getChats,
  getChatMembers,
  createChat,
};
