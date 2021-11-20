const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');

let mongoDb;

const connectToDatabase = async (opts = {}) => {
  mongoDb = await MongoMemoryServer.create(opts);
  const uri = await mongoDb.getUri();
  await mongoose.connect(uri);
};

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
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
  connectToDatabase,
  closeDatabase,
  clearDatabase,
};
