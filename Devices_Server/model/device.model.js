const { Schema, model } = require("mongoose");

const deviceSchema = new Schema({
  RU_id: { type: String, required: true },
  qr_code: { type: String, required: true },
  deviceName: { type: String, required: false },
  user_id: { type: String, required: false },
  device_configure: { type: String, required: true },
});

const Device = model("Device", deviceSchema);

module.exports = Device;
