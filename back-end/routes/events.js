const router = express.Router();
const express = require('express');
const eventsControllers = require('../controllers/events');

router.post('/pending/accept', eventsControllers.acceptPending);
router.post('/pending/decline', eventsControllers.declinePending);
router.get('/pending', eventsControllers.getEventsPending);
router.post('/create', eventsControllers.createEvent);

module.exports = router;
