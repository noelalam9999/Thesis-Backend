const express = require("express");
const http = require('http');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const route = require("./route");
const {Server} = require("socket.io");
const server = http.createServer(app);
const redis = require("redis");
const cron = require('node-cron');
const {formAccumulations} = require("./services/accumulation.service");

require("dotenv").config();

const corsConfig = {
  origin: [process.env.BASE_FRONTEND_URL, 'http://localhost:3000','https://dash.vertical-innovations.com/'],
  credentials: true,
};
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// let redisClient;

// (async () => {
//   redisClient = redis.createClient();

//   redisClient.on("error", (error) => console.error(`Error : ${error}`));

//   await redisClient.connect();
// })();

const connectedUsers = {};
io.on('connection', (socket) => {

  const { deviceRUid } = socket.handshake.query;
  console.log(deviceRUid)
  connectedUsers[deviceRUid] = socket.id;

  console.log('device connected', socket.id);

  socket.once('disconnect', () => delete connectedUsers[deviceRUid]);
});

app.use(cors(corsConfig));
app.io = io;
app.connectedUsers = connectedUsers;

// app.redisClient = redisClient;
// module.exports = app
app.use(express.json());
app.use(route);

(async function main() {

  cron.schedule('*/15 * * * *', async () => {
    
  });

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected successfully");
    server.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();


