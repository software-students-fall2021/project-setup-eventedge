// import express from 'express';
const express = require('express')

const app = express();

// import {router as authRoutes} from './routes/auth.js'
const authRoutes = require('./routes/auth')

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/auth', authRoutes)

app.get('/', (_req, res) => {
  res.send('Hello world!');
});

// export {app};
module.exports = app
