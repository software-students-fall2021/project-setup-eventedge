// const express = require('express')
// import express from 'express';
const express = require('express')

const authControllers = require('../controllers/auth')
// import {login, register} from '../controllers/auth'

const router = express.Router()

router.post('/register', authControllers.register)

router.post('/login', authControllers.login)


module.exports = router