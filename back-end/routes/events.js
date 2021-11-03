const express = require('express');
const eventsControllers = require('../controllers/events');

const router = express.Router();

router.get('/pending', eventsControllers.getEventsPending);
// router.get('/:id/members', chatsControllers.getChatMembers);
router.post('/create', eventsControllers.createEvent);

module.exports = router;
