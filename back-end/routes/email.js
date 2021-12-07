const express = require('express');
const emailControllers = require('../controllers/email');

const router = express.Router();

router.post('/send', emailControllers.send);

module.exports = router;
