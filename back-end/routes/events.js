const express = require('express');
const eventControllers = require('../controllers/events');

const router = express.Router();

router.post('/events/pending/accept', eventControllers.acceptPending);

router.post('/events/pending/decline', eventControllers.declinePending);

module.exports = router;
