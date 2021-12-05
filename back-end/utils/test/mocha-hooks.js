const mongoMemoryServer = require('./mongodb-mock');

exports.mochaHooks = {
  async beforeAll() {
    await mongoMemoryServer.createServerInstance();

    process.env.JWT_SECRET = 'secret';
    process.env.URI = mongoMemoryServer.getUri();
  },
  async afterAll() {
    await mongoMemoryServer.stopServer();
  },
  async afterEach() {
    await mongoMemoryServer.clearDatabase();
  },
};
