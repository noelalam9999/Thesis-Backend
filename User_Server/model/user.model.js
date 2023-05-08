const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["individual", "corporate", "super_admin"],
  },
});

const User = model("User", userSchema);

module.exports = User;
