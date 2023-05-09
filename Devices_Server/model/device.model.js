const { Schema, model } = require("mongoose");

const deviceSchema = new Schema({
  Ru_id: { type: String, required: true },
  qr_code: { type: String, required: true },
  deviceName: { type: String, required: true },
  email: { type: String, required: true },
  user_id: { type: String, required: true },
  device_configure: { type: String, required: true },
});

const Device = model("Device", deviceSchema);

module.exports = Device;
