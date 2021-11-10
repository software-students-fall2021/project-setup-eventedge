const {request} = require('./axios');
const {CHATS: fakeChatData} = require('../mock-data/chat');
const {USERS: fakeChatMembers} = require('../mock-data/user');
const generateRandomInt = require('../utils/generate-random-int');

const getChats = async (_, res) =>
  request()
    .get('/chats.json')
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      console.error(e);
      // mockaroo limit reached
      res.send(fakeChatData);
    });

const getChatMembers = async (_, res) =>
  request()
    .get('/members.json')
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      console.error(e);
      // mockaroo limit reached
      res.send(fakeChatMembers);
    });

const createChat = async (req, res) =>
  request()
    .post('/chats.json')
    .then((data) => {
      res.status(200).json({...data, id: generateRandomInt(0, 100)});
    })
    .catch((e) => {
      console.error(e);
      // mockaroo limit reached
      res
        .status(200)
        .json({id: generateRandomInt(0, 100), chatName: req.body.chatName});
    });

module.exports = {
  getChats,
  getChatMembers,
  createChat,
};
