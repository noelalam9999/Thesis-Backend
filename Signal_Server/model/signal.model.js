const { Schema, model } = require("mongoose");

const signalSchema = new Schema({
  deviceId: { type: String, required: true },
  timeStamp: { type: Date, required: true },
  gps: {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },
  acceleration: { type: String, required: true },
});

const Signal = model("Signal", signalSchema);

module.exports = Signal;
