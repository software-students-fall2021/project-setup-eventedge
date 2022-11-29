const express = require('express');
const eventsValidators = require('../middlewares/validate-event');
const eventsControllers = require('../controllers/events');
const {passportAuthenticate} = require('../middlewares/passport-authenticate');

const router = express.Router();

router.get('/', passportAuthenticate(), eventsControllers.getAllEvents);
router.post(
  '/pending/accept',
  passportAuthenticate(),
  eventsControllers.acceptPending
);
router.post(
  '/pending/decline',
  passportAuthenticate(),
  eventsControllers.declinePending
);
router.get(
  '/pending',
  passportAuthenticate(),
  eventsControllers.getPendingEvents
);
router.post(
  '/create',
  [passportAuthenticate(), eventsValidators.validateCreateEvent],
  eventsControllers.createEvent
);

module.exports = router;
