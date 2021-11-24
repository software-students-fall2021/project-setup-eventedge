const User = require('../models/User');
const Chat = require('../models/Chat');
const getUniqueIds = require('../utils/get-unique-ids');

const getChats = async (req, res) => {
  const user = await User.findById(req.user.id);
  const chats = await Chat.find(
    {_id: {$in: user.chats}},
    {_id: 0, name: 1, id: '$_id'},
    {sort: '-createdAt'}
  );

  res.status(200).json(chats);
};

const getChatMembers = async (req, res) => {
  const chat = await Chat.findById(req.params.id);

  if (!chat.users.includes(req.user.id)) {
    return res.status(401).json({error: 'Unauthorized'});
  }

  const members = await User.find(
    {_id: {$in: chat.users}},
    {_id: 0, username: 1, id: '$_id'}
  );

  return res.status(200).json(members);
};

const createChat = async (req, res) => {
  const {chatName} = req.body;
  const requestUserId = req.user.id;
  const usersList = getUniqueIds([...req.body.usersList, requestUserId]);

  const usersCount = await User.count({_id: {$in: usersList}});

  if (usersCount !== usersList.length) {
    return res.status(400).json({error: 'Provided users do not exist!'});
  }

  const chat = await Chat.create({name: chatName, users: usersList});
  await User.updateMany({_id: {$in: usersList}}, {$push: {chats: chat.id}});

  return res.status(200).json({
    id: chat.id,
    chatName,
    users: usersList,
  });
};

module.exports = {
  getChats,
  getChatMembers,
  createChat,
};
