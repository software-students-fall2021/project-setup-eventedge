const express = require('express');
const request = require('supertest');
const {expect} = require('chai');
const chatsRoutes = require('./chats');
const sinon = require('sinon');
const axios = require('axios');
const {CHATS: FALLBACK_CHATS} = require('../mock-data/chat');
const {USERS: FALLBACK_USERS} = require('../mock-data/user');

const CHATS = [
  {id: 1, chatName: 'Hello'},
  {id: 2, chatName: 'World'},
];

const USERS = [
  {id: 1, username: 'user'},
  {id: 2, username: 'secondUser'},
];

const stubAxios = (requestReturn) =>
  sinon.stub(axios, 'create').returns({request: requestReturn});

describe('chats route', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use('/chats', chatsRoutes);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('GET /chats', () => {
    it('should fetch Mockaroo', async () => {
      stubAxios(() => Promise.resolve({data: CHATS}));

      const response = await request(app).get('/chats');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(CHATS);
    });

    it('should return data from mocks if Mockaroo is unavailable', async () => {
      stubAxios(() => Promise.reject('test error'));

      const response = await request(app).get('/chats');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(FALLBACK_CHATS);
    });
  });

  describe('GET /chats/:id/members', () => {
    it('should fetch Mockaroo', async () => {
      stubAxios(() => Promise.resolve({data: USERS}));

      const response = await request(app).get('/chats/1/members');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(USERS);
    });

    it('should return data from mocks if Mockaroo is unavailable', async () => {
      stubAxios(() => Promise.reject('test error'));

      const response = await request(app).get('/chats/1/members');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(FALLBACK_USERS);
    });
  });
});
