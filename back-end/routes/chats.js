const express = require('express');
const chatsControllers = require('../controllers/chats');
const chatValidators = require('../middlewares/validate-chat');

const router = express.Router();

router.get('/', chatsControllers.getChats);
router.get('/:id/members', chatsControllers.getChatMembers);
router.post('/', chatValidators.validateCreateChat, chatsControllers.createChat);

module.exports = router;
