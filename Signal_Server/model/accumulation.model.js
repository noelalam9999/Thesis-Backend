const { Schema, model } = require("mongoose");
const {Signal} = require("./signal.model");
const accumulationSchema = new Schema({
  deviceRUid: { type: String, required: false },
  time: { type: Date, required: false }, 
  totalTime: { type: Number, required: false }, 
  totalDistance: { type: String, required: false },
  totalHorns: { type: String, required: false },
});

const Accumulation = model("Accumulation", accumulationSchema);

async function create(signals){
  const lastSignal = Signal.findOne({deviceRUid:signals[0].deviceRUid}, {}, { sort: { 'created_at' : -1 } });  
  if(latestAccumulatedSignal){
    await Accumulation.create({
   
    });
  }
  // if(signals.length<1) {
   
         
  //     }
  const accumulation = signals.slice(1).map((item, key , arr)=>{
    return {
      deviceRUid : signals[0].deviceRUid,
      time : signals[0].time,
      totalTime : signals[0].time
    }

  })
  return await Accumulation.insertMany(signals);
};

async function getAll(){
  return await Accumulation.find();
};


async function getByDeviceRuId(deviceRUid){
  return await Accumulation.find({deviceRUid:deviceRUid});
};


module.exports = { create, getAll, getByDeviceRuId};
