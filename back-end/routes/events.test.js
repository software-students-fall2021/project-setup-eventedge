const express = require('express');
const request = require('supertest');
const {expect} = require('chai');
const mongoMock = require('../utils/test/mongodb-mock');
const eventsRoutes = require('./events');
const User = require('../models/User');
const Event = require('../models/Event');

describe('events route', () => {
  let app;

  before(async () => {
    await mongoMock.connectToDatabase();
  });

  beforeEach(() => {
    app = express();
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use('/events', eventsRoutes);
  });

  afterEach(async () => {
    await mongoMock.clearDatabase();
  });

  after(async () => await mongoMock.closeDatabase());

  describe('POST /events/pending/accept', () => {
    it('should remove specified event from pending array and add to accepted', async () => {
      const {eventId1} = await Event.create({
        name: 'Exam 2',
        date: Date(2021 - 12 - 10),
        time: '8:00PM',
        location: 'School',
        description: 'The worst exam of my life',
        chatId: '3',
      });
      const {eventId2} = await Event.create({
        name: 'Exam 3',
        date: Date(2021 - 12 - 20),
        time: '4:00PM',
        location: 'School',
        description: 'Another exam',
        chatId: '3',
      });

      const {eventId3} = await Event.create({
        name: 'Restaurant hangout',
        date: Date(2022 - 01 - 01),
        time: '6:00PM',
        location: 'NYC',
        description: 'Having fun with the boiz',
        chatId: '3',
      });

      const {userId} = await User.create({
        username: 'farhan',
        password:
          '$2b$10$jvVvHoJg7n52K3Xic2yVueoBp9FhPLx8WdNEJ2pjjS3U3.nwaW2ii',
        chats: [],
        pendingEvents: [eventId1, eventId2],
        acceptedEvents: [eventId3],
      });
      sinon
        .stub(passport, 'authenticate')
        .callsFake((strategy, options, callback) => {
          callback(null, {username: userId}, null);
          return (req, res, next) => {};
        });
      const response = await request(app)
        .post('/events/pending/accept')
        .send({userId: userId, eventId: eventId1});
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        accepted: [eventId2],
        pending: [eventId3, eventId1],
      });
    });
  });

  describe('POST /events/pending/decline', () => {
    it('should remove specified event from pending array ONLY', async () => {
      const {eventId1} = await Event.create({
        name: 'Exam 2',
        date: Date(2021 - 12 - 10),
        time: '8:00PM',
        location: 'School',
        description: 'The worst exam of my life',
        chatId: '3',
      });
      const {eventId2} = await Event.create({
        name: 'Exam 3',
        date: Date(2021 - 12 - 20),
        time: '4:00PM',
        location: 'School',
        description: 'Another exam',
        chatId: '3',
      });

      const {eventId3} = await Event.create({
        name: 'Restaurant hangout',
        date: Date(2022 - 01 - 01),
        time: '6:00PM',
        location: 'NYC',
        description: 'Having fun with the boiz',
        chatId: '3',
      });

      const {userId} = await User.create({
        username: 'farhan',
        password:
          '$2b$10$jvVvHoJg7n52K3Xic2yVueoBp9FhPLx8WdNEJ2pjjS3U3.nwaW2ii',
        chats: [],
        pendingEvents: [eventId1, eventId2],
        acceptedEvents: [eventId3],
      });
      sinon
        .stub(passport, 'authenticate')
        .callsFake((strategy, options, callback) => {
          callback(null, {username: userId}, null);
          return (req, res, next) => {};
        });
      const response = await request(app)
        .post('/events/pending/decline')
        .send({userId: userId, eventId: eventId1});
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        accepted: [eventId2],
        pending: [eventId3],
      });
    });
  });

  describe('GET /events', () => {
    it('should get accepted events from MongoDB', async () => {
      const {userId} = await User.create({
        username: 'farhan',
        password:
          '$2b$10$jvVvHoJg7n52K3Xic2yVueoBp9FhPLx8WdNEJ2pjjS3U3.nwaW2ii',
        chats: [],
        pendingEvents: [eventId1, eventId2],
        acceptedEvents: [eventId3],
      });

      sinon
        .stub(passport, 'authenticate')
        .callsFake((strategy, options, callback) => {
          callback(null, {username: userId}, null);
          return (req, res, next) => {};
        });
      return request
        .get('/events')
        .expect(200)
        .expect((res) => {
          res.body.acceptedEvents.should.equal(userId.acceptedEvents);
        });
    });
  });

  describe('GET /events/pending', () => {
    it('should get pending events from MongoDB', async () => {
      const {userId} = await User.create({
        username: 'farhan',
        password:
          '$2b$10$jvVvHoJg7n52K3Xic2yVueoBp9FhPLx8WdNEJ2pjjS3U3.nwaW2ii',
        chats: [],
        pendingEvents: [eventId1, eventId2],
        acceptedEvents: [eventId3],
      });

      sinon
        .stub(passport, 'authenticate')
        .callsFake((strategy, options, callback) => {
          callback(null, {username: userId}, null);
          return (req, res, next) => {};
        });
      return request
        .get('/events')
        .expect(200)
        .expect((res) => {
          res.body.pendingEvents.should.equal(userId.pendingEvents);
        });
    });
  });
});
