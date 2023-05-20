const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const route = require("./route");
require("dotenv").config();


const corsConfig = {
  origin: [process.env.BASE_FRONTEND_URL, 'http://localhost:3000'],
  credentials: true,
};
app.use(cors(corsConfig));

app.use(express.json());
app.use(route);

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
