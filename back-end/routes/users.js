const express = require('express');
const usersControllers = require('../controllers/users');
const {passportAuthenticate} = require('../middlewares/passport-authenticate');

const router = express.Router();

router.get('/', passportAuthenticate(), usersControllers.getAllUsers);

module.exports = router;
