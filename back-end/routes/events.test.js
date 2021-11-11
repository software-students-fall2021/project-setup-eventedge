const express = require('express');
const request = require('supertest');
const {expect} = require('chai');
const eventsRoutes = require('./events');
const sinon = require('sinon');
const axios = require('axios');
const {EVENTS: FALLBACK_EVENTS} = require('../mock-data/events');

const EVENTS = [
  {
    id: 10,
    chatId: 10,
    name: 'Test Event',
    date: '1999-01-01',
    time: '10:00:00',
    location: 'Moscow',
    description: 'Testing',
  },
];

const eventId = 10;

const stubAxios = (requestReturn) =>
  sinon.stub(axios, 'create').returns({request: requestReturn});

describe('chat route', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use('/events', eventsRoutes);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('POST /events/pending/accept', () => {
    it('should fetch Mockaroo', async () => {
      stubAxios(() => Promise.resolve({data: FALLBACK_EVENTS[0]}));

      const response = await request(app)
        .post('/events/pending/accept')
        .send({id: eventId});

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        message: 'accepted',
        event: {...FALLBACK_EVENTS[0], id: eventId},
      });
    });

    it('should return data from mock data if Mockaroo is unavailable', async () => {
      stubAxios(() => Promise.reject('test error'));

      const response = await request(app)
        .post('/events/pending/accept')
        .send({id: eventId});

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        message: 'accepted',
        event: {...FALLBACK_EVENTS[0], id: eventId},
      });
    });
  });

  describe('POST /events/pending/decline', () => {
    it('should fetch Mockaroo', async () => {
      stubAxios(() => Promise.resolve({data: FALLBACK_EVENTS[0]}));

      const response = await request(app)
        .post('/events/pending/decline')
        .send({id: eventId});

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        message: 'declined',
        event: {...FALLBACK_EVENTS[0], id: eventId},
      });
    });

    it('should return data from mock data if Mockaroo is unavailable', async () => {
      stubAxios(() => Promise.reject('test error'));

      const response = await request(app)
        .post('/events/pending/decline')
        .send({id: eventId});

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        message: 'declined',
        event: {...FALLBACK_EVENTS[0], id: eventId},
      });
    });
  });

  describe('GET /events', () => {
    it('should fetch Mockaroo', async () => {
      stubAxios(() => Promise.resolve({data: EVENTS}));

      const response = await request(app).get('/events');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(EVENTS);
    });

    it('should return data from mock data if Mockaroo is unavailable', async () => {
      stubAxios(() => Promise.reject('test error'));

      const response = await request(app).get('/events');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(FALLBACK_EVENTS);
    });
  });

  describe('GET /events/pending', () => {
    it('should fetch Mockaroo', async () => {
      stubAxios(() => Promise.resolve({data: EVENTS}));

      const response = await request(app).get('/events/pending');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(EVENTS);
    });

    it('should return data from mock data if Mockaroo is unavailable', async () => {
      stubAxios(() => Promise.reject('test error'));

      const response = await request(app).get('/events/pending');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(FALLBACK_EVENTS);
    });
  });
});
