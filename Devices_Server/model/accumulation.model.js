const { Schema, model } = require("mongoose");

const accumulationSchema = new Schema({
  deviceRUid: { type: String, required: false },
  time: { type: Date, required: false }, 
  totalTime: { type: Number, required: false }, 
  totalDistance: { type: Number, required: false },
  totalHorns: { type: String, required: false },
});

const Accumulation = model("Accumulation", accumulationSchema);

async function create(deviceRUid){
  return await Accumulation.create({
    deviceRUid,
    totalTime:0,
    totalDistance:0,
    totalHorns:0,
  });
};




module.exports = { create };
