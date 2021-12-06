const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');

let mongoDb;

const createServerInstance = async (opts = {}) => {
  mongoDb = await MongoMemoryServer.create(opts);
};

const getUri = () => {
  if (!mongoDb) {
    throw new Error('Mongo Memory server is not initialized!');
  }

  return mongoDb.getUri();
};

const stopServer = async () => {
  await mongoDb.stop();
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

module.exports = {
  clearDatabase,
  createServerInstance,
  getUri,
  stopServer,
};
