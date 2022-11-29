const express = require('express');
const authControllers = require('../controllers/auth');
const authValidators = require('../middlewares/validate-auth');

const router = express.Router();

router.post('/login', authValidators.validateAuth, authControllers.login);
router.post('/register', authValidators.validateAuth, authControllers.register);

module.exports = router;
