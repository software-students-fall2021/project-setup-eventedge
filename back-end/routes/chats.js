const express = require('express');
const chatsControllers = require('../controllers/chats');

const router = express.Router();

router.get('/', chatsControllers.getChats);
router.get('/:id/members', chatsControllers.getChatMembers);
router.post('/', chatsControllers.createChat);

module.exports = router
