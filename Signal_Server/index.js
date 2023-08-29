const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const route = require("./route");
const { Server } = require("socket.io");
const server = http.createServer(app);
const cron = require("node-cron");
const { formAccumulations } = require("./services/accumulation.service");
const signalmodel = require("./model/signal.model");
// const mqtt = require("./services/mqtt");
const mqtt = require("mqtt");
require("dotenv").config();

const corsConfig = {
  origin: [
    process.env.BASE_FRONTEND_URL,
    "http://localhost:3000",
    "https://dash.vertical-innovations.com/",
    "https://horen-dashboard.vercel.app",
  ],
  credentials: true,
};
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// let redisClient;

// (async () => {
//   redisClient = redis.createClient();

//   redisClient.on("error", (error) => console.error(`Error : ${error}`));

//   await redisClient.connect();
// })();

var options = {
  host: "e60a7fae13a04a2b94a8f1a5811ac024.s2.eu.hivemq.cloud",
  port: 8883,
  protocol: "mqtts",
  username: "horen",
  password: "alam2323",
};

var client = mqtt.connect(options);
client.on("connect", function () {
  console.log("MQTT Connected");
});
const topic = "mqtt";
client.subscribe(topic);

const connectedUsers = {};
io.on("connection", (socket) => {
  const { deviceRUid } = socket.handshake.query;
  connectedUsers[deviceRUid] = socket.id;
  console.log("device connected", socket.id);
  socket.once("disconnect", () => delete connectedUsers[deviceRUid]);
});

app.use(cors(corsConfig));
app.io = io;
app.connectedUsers = connectedUsers;

// app.redisClient = redisClient;
// module.exports = app
app.use(express.json());
app.use(route);

client.on("message", async function (topic, message) {
  try {
    const data = await JSON.parse(message);
    // const result = await signalmodel.createSignals(data);
    // const sumOfSignalsByDate = await signalmodel.getSignalSumByDateByDevices([
    //   result[0].deviceRUid,
    // ]);
    // io.to(connectedUsers[result[0].deviceRUid]).emit(
    //   "newSignal",
    //   sumOfSignalsByDate
    // );
    console.log(data);
  } catch (e) {
    console.log(e);
  }
});

(async function main() {
  cron.schedule("*/15 * * * *", async () => {
    await formAccumulations();
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
