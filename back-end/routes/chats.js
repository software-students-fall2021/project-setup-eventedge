const express = require('express');
const chatsControllers = require('../controllers/chats');
const chatsValidators = require('../middlewares/validate-chat');
const {passportAuthenticate} = require('../middlewares/passport-authenticate');

const router = express.Router();

router.get('/', passportAuthenticate(), chatsControllers.getChats);
router.get(
  '/:id/members',
  passportAuthenticate(),
  chatsControllers.getChatMembers
);
router.post(
  '/',
  [passportAuthenticate(), chatsValidators.validateCreateChat],
  chatsControllers.createChat
);
router.post('/:chatId', passportAuthenticate(), chatsControllers.leaveChat);

module.exports = router;
