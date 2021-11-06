const express = require('express');
const eventControllers = require('../controllers/events');

const router = express.Router();

router.post('/pending/accept', eventControllers.acceptPending);
router.post('/pending/decline', eventControllers.declinePending);

module.exports = router;
