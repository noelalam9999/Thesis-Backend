const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  password: String,
  type: {
    type: String,
    default: "individual",
    enum: ["individual", "corporate", "super_admin"],
  },
  profilePic: {
    type: String,
  },
});

const User = model("User", userSchema);
async function getAll(){
    return await User.find({},{name : 1, profilePic: 1});
}
module.exports = {getAll};
