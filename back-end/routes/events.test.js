const superTestRequest = require('supertest');
const {expect} = require('chai');
const User = require('../models/User');
const Event = require('../models/Event');
const generateMongoObjectId = require('../utils/test/generate-mongo-object-id');
const Chance = require('chance');

const chance = new Chance();

const authUsername = 'authUsername';
const authPassword = 'authPassword';

const generateRandomEventData = () => ({
  name: chance.sentence({words: 2}),
  date: chance.date({string: true}),
  time: '10:00PM',
  location: chance.city(),
  description: chance.sentence({words: 10}),
  chatId: generateMongoObjectId(),
});

describe('events route', () => {
  let authHeader;
  let authUserId;
  let request;

  before(() => {
    request = superTestRequest(
      require('../app')({connectionUri: process.env.URI})
    );
  });

  beforeEach(async () => {
    const {id} = await User.create({
      username: authUsername,
      password: authPassword,
    });
    const res = await request
      .post('/auth/login')
      .send({username: authUsername, password: authPassword});

    authUserId = id;
    authHeader = {Authorization: `Bearer ${res.body.token}`};
  });

  describe('GET /events', () => {
    it('should get empty accepted events if there are not any', async () => {
      const response = await request.get('/events').set(authHeader);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([]);
    });

    it('should get accepted events in date descending order', async () => {
      const firstEvent = await Event.create(generateRandomEventData());
      const secondEvent = await Event.create(generateRandomEventData());
      const thirdEvent = await Event.create(generateRandomEventData());

      await User.updateOne(
        {_id: authUserId},
        {$push: {acceptedEvents: firstEvent.id, pendingEvents: secondEvent.id}}
      );
      await User.updateOne(
        {_id: authUserId},
        {$push: {acceptedEvents: thirdEvent.id}}
      );

      const response = await request.get('/events').set(authHeader);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([
        {
          name: thirdEvent.name,
          date: thirdEvent.date.toISOString(),
          chatId: thirdEvent.chatId,
          id: thirdEvent.id,
        },
        {
          name: firstEvent.name,
          date: firstEvent.date.toISOString(),
          chatId: firstEvent.chatId,
          id: firstEvent.id,
        },
      ]);
    });
  });

  describe('GET /events/pending', () => {
    it('should get empty pending events if there are not any', async () => {
      const response = await request.get('/events/pending').set(authHeader);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([]);
    });

    it('should get pending events in date descending order', async () => {
      const firstEvent = await Event.create(generateRandomEventData());
      const secondEvent = await Event.create(generateRandomEventData());
      const thirdEvent = await Event.create(generateRandomEventData());

      await User.updateOne(
        {_id: authUserId},
        {$push: {pendingEvents: firstEvent.id, acceptedEvents: secondEvent.id}}
      );
      await User.updateOne(
        {_id: authUserId},
        {$push: {pendingEvents: thirdEvent.id}}
      );

      const response = await request.get('/events/pending').set(authHeader);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([
        {
          name: thirdEvent.name,
          date: thirdEvent.date.toISOString(),
          id: thirdEvent.id,
        },
        {
          name: firstEvent.name,
          date: firstEvent.date.toISOString(),
          id: firstEvent.id,
        },
      ]);
    });
  });

  describe('POST /events/pending/accept', () => {
    it('should accept pending event', async () => {
      const pendingEvent = await Event.create(generateRandomEventData());

      await User.updateOne(
        {_id: authUserId},
        {$push: {pendingEvents: pendingEvent.id}}
      );

      const response = await request
        .post('/events/pending/accept')
        .set(authHeader)
        .send({eventId: pendingEvent.id});

      const updatedUser = await User.findById(authUserId);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        accepted: true,
        date: pendingEvent.date.toISOString(),
        id: pendingEvent.id,
        name: pendingEvent.name,
      });
      expect(updatedUser.acceptedEvents).to.deep.equal([pendingEvent.id]);
      expect(updatedUser.pendingEvents).to.deep.equal([]);
    });

    it('should return unauthorized error if user is not invited to event', async () => {
      const pendingEvent = await Event.create(generateRandomEventData());

      const response = await request
        .post('/events/pending/accept')
        .set(authHeader)
        .send({eventId: pendingEvent.id});

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({error: 'Unauthorized'});
    });
  });

  describe('POST /events/pending/decline', () => {
    it('should decline pending event', async () => {
      const pendingEvent = await Event.create(generateRandomEventData());

      await User.updateOne(
        {_id: authUserId},
        {$push: {pendingEvents: pendingEvent.id}}
      );

      const response = await request
        .post('/events/pending/decline')
        .set(authHeader)
        .send({eventId: pendingEvent.id});

      const updatedUser = await User.findById(authUserId);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        accepted: false,
        date: pendingEvent.date.toISOString(),
        id: pendingEvent.id,
        name: pendingEvent.name,
      });
      expect(updatedUser.acceptedEvents).to.deep.equal([]);
      expect(updatedUser.pendingEvents).to.deep.equal([]);
    });

    it('should return unauthorized error if user is not invited to event', async () => {
      const pendingEvent = await Event.create(generateRandomEventData());

      const response = await request
        .post('/events/pending/decline')
        .set(authHeader)
        .send({eventId: pendingEvent.id});

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({error: 'Unauthorized'});
    });
  });
});
