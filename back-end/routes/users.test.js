const {expect} = require('chai');
const User = require('../models/User');
const superTestRequest = require('supertest');

describe('Users routes', () => {
  let authHeader;
  let request;

  before(() => {
    request = superTestRequest(
      require('../app')({connectionUri: process.env.URI})
    );
  });

  beforeEach(async () => {
    const res = await request
      .post('/auth/register')
      .send({username: 'test1', password: 'test1'});

    authHeader = {Authorization: `Bearer ${res.body.token}`};
  });

  describe('GET /users', () => {
    it('should return empty response if the single registered user makes request', async () => {
      const response = await request.get('/users').set(authHeader);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([]);
    });

    it('should return list containing only one user', async () => {
      const username = 'testusername';
      const {id} = await User.create({username, password: 'test1'});

      const response = await request.get('/users').set(authHeader);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([{username, id}]);
    });
  });
});
