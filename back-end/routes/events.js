const express = require('express');
const eventsValidators = require('../middlewares/validate-event');
const eventsControllers = require('../controllers/events');
const {passportAuthenticate} = require('../middlewares/passport-authenticate');

const router = express.Router();

router.get('/', eventsControllers.getAllEvents);
router.post('/pending/accept', eventsControllers.acceptPending);
router.post('/pending/decline', eventsControllers.declinePending);
router.get('/pending', eventsControllers.getPendingEvents);
router.post(
  '/create',
  [passportAuthenticate(), eventsValidators.validateCreateEvent],
  eventsControllers.createEvent
);

module.exports = router;
