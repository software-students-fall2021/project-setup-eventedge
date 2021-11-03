const express = require('express');
const authRoutes = require('./routes/auth');
const http = require('http')
const socketIo = require("socket.io");

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/auth', authRoutes);

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        
    }
}); 

let interval;

let msgs = {}

io.on("connection", socket => {
    let i = 1
    console.log("New client connected", i);
    i++
    
    socket.on("joinRoom", ( {username, chatId} ) => {
      console.log(username, chatId);
      socket.join(chatId)
      // const join = username + " read"
      // socket.broadcast.to(chatId).emit('joinMessage',join)
  })

  socket.on('retrieveMsgs', ({chatId}) => {
    io.to(chatId).emit("retrieveMsgs", msgs[chatId])
  })

  socket.on('sendMsg', ({msgObj, chatId}) => {
    console.log('sendMsg');
    console.log(msgObj, chatId);
    if (msgs.hasOwnProperty(chatId)){
      const length = msgs[chatId].length
      msgObj.id = length
      msgs[chatId].push(msgObj)
    } else{
      msgs[chatId] = [msgObj]
    }
    io.to(chatId).emit("sendMsg", msgObj)
  } )


    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
})

app.get('/', (_req, res) => {
  res.send('Hello world!');
});

module.exports = server
