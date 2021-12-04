const app = require('../app');
const request = require('supertest')(app);
const {expect} = require('chai');
const mongoDbMock = require('../utils/test/mongodb-mock');
const User = require('../models/User');

describe('Users routes', () => {
  let token;

  before(async () => {
    process.env.JWT_SECRET = 'secret';
    process.env.URI = await mongoDbMock.getMemoryServerUri();
  })

  beforeEach(async () => {
    const res = await request.post('/auth/register').send({username: 'test1', password: 'test1'});
    token = res.body.token;
  });

  afterEach(async () => {
    await mongoDbMock.clearDatabase()
  });

  after(async () => {
    await mongoDbMock.closeDatabase();
  });

  describe('GET /users', () => {
    it('should return empty response if the single registered user makes request', async () => {
      const response = await request.get('/users').set('Authorization', `Bearer ${token}`);

      expect(response.body).to.deep.equal([]);
    });

    it('should return list containing only one user', async () => {
      const username = 'testusername';
      const {id} = await User.create({username, password: 'test1'});

      const response = await request.get('/users').set('Authorization', `Bearer ${token}`);

      expect(response.body).to.deep.equal([{username, id}]);
    })
  })
})
