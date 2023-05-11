const express = require("express");
const app = express();
const mongoose = require("mongoose");
const route = require("./route");
require("dotenv").config();
const cors = require('cors');

app.use(express.json());
app.use(route);

const corsConfig = {
  origin: [process.env.BASE_FRONTEND_URL, 'http://192.168.68.76:3000/'],
  credentials: true,
};

app.use(cors(corsConfig));
(async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected successfully");
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
