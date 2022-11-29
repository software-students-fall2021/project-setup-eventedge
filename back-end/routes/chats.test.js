const superTestRequest = require('supertest');
const {expect} = require('chai');
const User = require('../models/User');
const Chat = require('../models/Chat');
const generateMongoObjectId = require('../utils/test/generate-mongo-object-id');

const authUsername = 'test1';
const authPassword = 'test2';

describe('Chats routes', () => {
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

  describe('GET /chats', () => {
    it('should return empty response if user has no chats', async () => {
      const response = await request.get('/chats').set(authHeader);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([]);
    });

    it('should return list of users chats in a date descending order', async () => {
      const firstChatTitle = 'firstChatTitle';
      const secondChatTitle = 'secondChatTitle';

      const firstChat = await Chat.create({
        name: firstChatTitle,
        users: [authUserId],
      });
      const secondChat = await Chat.create({
        name: secondChatTitle,
        users: [authUserId, generateMongoObjectId()],
      });
      await User.updateOne(
        {_id: authUserId},
        {chats: [firstChat.id, secondChat.id]}
      );

      const response = await request.get('/chats').set(authHeader);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([
        {name: secondChatTitle, id: secondChat.id, usersCount: 2},
        {name: firstChatTitle, id: firstChat.id, usersCount: 1},
      ]);
    });
  });

  describe('GET /chats/:id/members', () => {
    it('should return chat members', async () => {
      const chatTitle = 'chatTitle';
      const {id} = await Chat.create({name: chatTitle, users: [authUserId]});

      const response = await request
        .get(`/chats/${id}/members`)
        .set(authHeader);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([
        {username: authUsername, id: authUserId},
      ]);
    });

    it('should return unauthorized error if endpoint is accessed by user who is not in the chat', async () => {
      const chatTitle = 'chatTitle';
      const {id} = await Chat.create({name: chatTitle, users: []});

      const response = await request
        .get(`/chats/${id}/members`)
        .set(authHeader);

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({error: 'Unauthorized'});
    });
  });

  describe('POST /chats', () => {
    it('should create a chat and update user chats', async () => {
      const chatName = 'some random chat';

      const response = await request
        .post('/chats')
        .send({chatName, usersList: []})
        .set(authHeader);

      const authUser = await User.findById(authUserId);

      expect(response.status).to.equal(200);
      expect(response.body.chatName).to.equal(chatName);
      expect(response.body.users).to.deep.equal([authUserId]);
      expect(authUser.chats).to.deep.equal([response.body.id]);
    });

    it('should respond with status 400 if chatName is not provided', async () => {
      const response = await request
        .post('/chats')
        .send({usersList: []})
        .set(authHeader);

      expect(response.status).to.equal(400);
    });

    it('should respond with status 400 if chatName is less than 5 characters', async () => {
      const response = await request
        .post('/chats')
        .send({chatName: 'a', usersList: []})
        .set(authHeader);

      expect(response.status).to.equal(400);
    });

    it('should respond with status 400 if chatName is more than 40 characters', async () => {
      const chatName = Array(41).fill('a').join('');
      const response = await request
        .post('/chats')
        .send({chatName, usersList: []})
        .set(authHeader);

      expect(response.status).to.equal(400);
    });

    it('should respond with status 400 if usersList is not provided', async () => {
      const response = await request
        .post('/chats')
        .send({chatName: 'chatName'})
        .set(authHeader);

      expect(response.status).to.equal(400);
    });

    it('should respond with status 400 if usersList contains non-existant ids', async () => {
      const response = await request
        .post('/chats')
        .send({chatName: 'chatName', usersList: [generateMongoObjectId()]})
        .set(authHeader);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        error: 'Provided users do not exist!',
      });
    });
  });

  describe('POST /chats/:chatId/leave', () => {
    it('should leave chat without exception', async () => {
      const chat = await Chat.create({
        name: 'chatName',
        users: [authUserId],
      });

      await User.updateOne({_id: authUserId}, {chats: [chat.id]});

      const response = await request
        .post(`/chats/${chat.id}/leave`)
        .set(authHeader);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({chatId: chat.id});
    });

    it('should respond with bad request if user does not belong to chat', async () => {
      const chat = await Chat.create({
        name: 'chatName',
        users: [],
      });

      const response = await request
        .post(`/chats/${chat.id}/leave`)
        .set(authHeader);

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({error: 'Bad request'});
    });

    it('should respond with bad request if chat does not exist', async () => {
      const response = await request
        .post(`/chats/${generateMongoObjectId()}/leave`)
        .set(authHeader);

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({error: 'Bad request'});
    });
  });
});
