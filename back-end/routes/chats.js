const express = require('express');
const chatsControllers = require('../controllers/chats');
const chatsValidators = require('../middlewares/validate-chat');

const router = express.Router();

router.get('/', chatsControllers.getChats);
router.get('/:id/members', chatsControllers.getChatMembers);
router.post(
  '/',
  chatsValidators.validateCreateChat,
  chatsControllers.createChat
);

module.exports = router;
