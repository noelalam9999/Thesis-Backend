const { Schema, model } = require("mongoose");

const deviceSchema = new Schema({
  RU_id: { type: String, required: true },
  qr_code: { type: String, required: true },
  user_id: { type: String, required: false },
  pseudoname: { type: String, required: false },
  company_id: { type: String, required: false },
  employee: {
    _id : String,
    name: String,
    phone: String,
    department: String,
    vehicle_no: String,
    image: String
  },
  device_configure: { type: String, required: true },
});

const Device = model("Device", deviceSchema);

module.exports = Device;
