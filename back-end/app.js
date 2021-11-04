const express = require('express');
const authRoutes = require('./routes/auth');
const http = require('http')
const socketIo = require("socket.io");

const app = express();

// middlewares
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// routes
app.use('/auth', authRoutes);

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        
    }
}); 

let interval;

io.on("connection", socket => {
    console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
})

const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
  };

app.get('/', (_req, res) => {
  res.send('Hello world!');
});

module.exports = server
