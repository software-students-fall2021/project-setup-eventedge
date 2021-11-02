const express = require('express');
const eventControllers = require('../controllers/events');

const router = express.Router();

router.post('/events/pending/accept', authControllers.acceptPending);

router.post('/events/pending/decline', authControllers.declinePending);

module.exports = router;
