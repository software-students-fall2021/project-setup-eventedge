// const {createServer} = require('http');
// const Client = require('socket.io-client');
// const {expect} = require('chai');
// const createSocket = require('./socket');
// const mongoMock = require('../utils/test/mongodb-mock');
// const Chat = require('../models/Chat');

// const makeServer = () => {
//   const httpServer = createServer();
//   createSocket(httpServer);
//   httpServer.listen(8000, () => {
//     console.log('listening on 8000');
//   });

//   return httpServer;
// };

// describe('Socket test', () => {
//   let server;
//   let sockets;

//   before(async () => {
//     await mongoMock.connectToDatabase();
//   });

//   beforeEach(() => {
//     sockets = [];
//     server = makeServer();
//   });

//   afterEach(async () => {
//     server.close();
//     sockets.forEach((e) => e.disconnect());
//     await mongoMock.clearDatabase();
//   });

//   after(async () => await mongoMock.closeDatabase());

//   const makeSocket = (id = 0) => {
//     const socket = Client.connect('http://localhost:8000', {
//       reconnectionDelay: 0,
//       'force new connection': true,
//       transports: ['websocket'],
//     });

//     socket.on('connect', () => {
//       console.log(`client ${id} connected`);
//     });

//     socket.on('disconnect', () => {
//       console.log(`client ${id} disconnected`);
//     });

//     sockets.push(socket);

//     return socket;
//   };

//   it('should receive initial messages in the database', async () => {
//     const username = '5ca4bbc7a2dd94ee5816238c';
//     const testMessage = {
//       username,
//       message: 'fdssdf',
//       date: '11/11/2021 06:27 PM',
//     };

//     const username2 = '5ca4bbc7a2dd94ee5816238c'
//     const testMessage2 = {
//       username2,
//       message: 'hello',
//       date: '11/12/2021 06:15 PM'
//     }

//     const {id} = await Chat.create({
//       name: 'test',
//       latestEvent: '',
//       users: [username, username2],
//       messages: [testMessage, testMessage2],
//     });

//     const socket = makeSocket(username);

//     return new Promise((resolve, _reject) => {
//       socket.emit('joinRoom', {username, chatId: id});
//       socket.emit('retrieveMsgs', {chatId: id});
//       socket.on('retrieveMsgs', (msgs) => {
//         expect(msgs).to.deep.equal([testMessage, testMessage2]);
//         resolve();
//       });
//     });
//   });

//   it('should receive previously sent messages by other user', async () => {
//     const socketOneId = '5ca4bbc7a2dd94ee5816238c';
//     const socketTwoId = '5ca4bbc7a2dd94ee5816238d';
//     const testMessage = {
//       username: socketOneId,
//       message: socketOneId,
//       date: '11/11/2021 06:27 PM',
//     };

//     const {id} = await Chat.create({
//       name: 'test',
//       latestEvent: '',
//       users: [socketOneId, socketTwoId],
//       messages: [],
//     });

//     const socketOne = makeSocket(socketOneId);
//     const socketTwo = makeSocket(socketTwoId);

//     await new Promise((resolve, _reject) => {
//       socketOne.emit('joinRoom', {username: socketOneId, chatId: id});
//       socketOne.emit('sendMsg', {msgObj: testMessage, chatId: id});
//       // need to set minimal timeout because writes to memory db take some time
//       setTimeout(resolve, 20);
//     });

//     await new Promise((resolve, _reject) => {
//       socketTwo.emit('joinRoom', {username: socketTwoId, chatId: id});
//       socketTwo.emit('retrieveMsgs', {chatId: id});
//       socketTwo.on('retrieveMsgs', (messages) => {
//         expect(messages).to.deep.equal([testMessage]);
//         resolve();
//       });
//     });
//   });
// });

const express = require('express');
const request = require('supertest');
const {expect} = require('chai');
const mongoMock = require('../utils/test/mongodb-mock');
const eventsRoutes = require('./events');
const axios = require('axios');
const User = require('../models/User');
const Event = require('../models/Event');

const eventId = 10;

describe('events route', () => {
  let app;

  before(async () => {
    await mongoMock.connectToDatabase();
  });

  beforeEach(() => {
    app = express();
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use('/events', eventsRoutes);
  });

  afterEach(() => {
    await mongoMock.clearDatabase();
  });

  after(async () => await mongoMock.closeDatabase());

  describe('POST /events/pending/accept', () => {
    it('should remove specified event from pending array and add to accepted', async () => {
      const {eventId1} = await Event.create({
        name: 'Exam 2',
        date: Date(2021 - 12 - 10),
        time: '8:00PM',
        location: 'School',
        description: 'The worst exam of my life',
        chatId: '3'
      });
      const {eventId2} = await Event.create({
        name: 'Exam 3',
        date: Date(2021 - 12 - 20),
        time: '4:00PM',
        location: 'School',
        description: 'Another exam',
        chatId: '3'
      })

      const {eventId3} = await Event.create({
        name: 'Restaurant hangout',
        date: Date(2022 - 01 - 01),
        time: '6:00PM',
        location: 'NYC',
        description: 'Having fun with the boiz',
        chatId: '3'
      })
  
      const {userId} = await User.create({
        username: 'farhan',
        password:
          '$2b$10$jvVvHoJg7n52K3Xic2yVueoBp9FhPLx8WdNEJ2pjjS3U3.nwaW2ii',
        chats: [],
        pendingEvents: [eventId1, eventId2],
        acceptedEvents: [eventId3]
      });

      const response = await request(app)
        .post('/events/pending/accept')
        .send(id);
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        accepted: [5, 7, 1, 13, 2],
        pending: [6],
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
  });

  describe('GET /events', () => {
    it('should get accepted events from MongoDB', async () => {
      stubAxios(() => Promise.resolve({data: EVENTS}));

      const response = await request(app).get('/events');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(EVENTS);
    });
  });

  describe('GET /events/pending', () => {
    it('should get pending events from MongoDB', async () => {
      stubAxios(() => Promise.resolve({data: EVENTS}));

      const response = await request(app).get('/events/pending');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(EVENTS);
    });
  });
});
