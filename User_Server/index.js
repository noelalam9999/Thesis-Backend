const express = require("express");
const app = express();
const mongoose = require("mongoose");
const route = require("./route");

app.use(express.json());
app.use(route);

(async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/User-Database");
    console.log("connected successfully");
    app.listen(3000, () => {
      console.log(`Server running at http://localhost:3000`);
    });
  } catch (error) {
    console.log(error);
  }
})();
