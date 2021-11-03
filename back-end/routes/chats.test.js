const express = require('express');
const request = require('supertest');
const {assert} = require('chai');
const chatsRoutes = require('./chats');
const sinon = require('sinon');
const axiosWrapper = require('../controllers/axios');
const {CHATS: FALLBACK_CHATS} = require('../mock-data/chat');

const CHATS = [
  {id: 1, chatName: 'Hello'},
  {id: 2, chatName: 'World'},
];

describe('chats route', () => {
  let app;
  let axiosWrapperStub;

  beforeEach(() => {
    app = express();
    app.use('/chats', chatsRoutes);
    axiosWrapperStub = sinon.stub(axiosWrapper, 'request').callsFake(() => {console.log('stub')});
    process.env.MOCKAROO_API_KEY = 'testKey';
  });

  afterEach(() => {
    axiosWrapperStub.restore();
    delete process.env.MOCKAROO_API_KEY;
  });

  describe('/chats', () => {
    it('should fetch Mockaroo', () => {
      axiosWrapperStub.returns(Promise.resolve(CHATS));

      request(app)
        .get('/chats')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          assert.deepEqual(res, CHATS);
        });
    });

    it('should return data from mocks if Mockaroo is unavailable', () => {
      axiosWrapperStub.returns(Promise.reject());

      request(app)
        .get('/chats')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          assert.deepEqual(res, FALLBACK_CHATS);
        });
    })
  });
});
