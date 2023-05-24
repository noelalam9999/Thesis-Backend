const { Schema, model } = require("mongoose");
// const {Signal} = require("./signal.model");
const Distance = require('geo-distance');

const accumulationSchema = new Schema({
  deviceRUid: { type: String, required: false },
  time: { type: Date, required: false }, 
  totalTime: { type: Number, required: false }, 
  totalDistance: { type: String, required: false },
  totalHorns: { type: String, required: false },
});

const Accumulation = model("Accumulation", accumulationSchema);

async function create(signals){
    const lastAcc = Accumulation.findOne({deviceRUid:signals[0].deviceRUid}, {}, { sort: { 'created_at' : -1 } });  
    let accumulation = [];
    if (!lastAcc){
      accumulation.push({
      deviceRUid : signals[0].deviceRUid,
      timeStamp : signals[0].time,
      totalDistance : 0,
      totalTime : 0,
      totalHorns : 0,
    });
    }
    else{
      accumulation.push({
      deviceRUid : lastAcc.deviceRUid,
      timeStamp : lastAcc.time,
      totalDistance : 0,
      totalTime : 0,
      totalHorns : 0,
    })
    }
    

    for (let i = 1; i < signals.length ; i++){
      console.log(signals[i].gps.split(':')[0],signals[i-1].gps.split(':')[1]);
      accumulation.push({
      deviceRUid : signals[i].deviceRUid,
      timeStamp : signals[i].time,
      totalDistance : accumulation[i-1].totalDistance + Distance.between(
        {
          lat : signals[i].gps.split(':')[0],
          long : signals[i].gps.split(':')[1]
        },
        {
          lat : signals[i-1].gps.split(':')[0],
          long : signals[i-1].gps.split(':')[1]
        }
       ),
      totalTime : accumulation[i-1].totalTime + ((new Date(signals[i].time) - new Date(signals[i-1].time))/3600000),
      totalHorns : parseInt(accumulation[i-1].totalHorns) + parseInt(signals[i].horn),
      })
    }
  // return await Accumulation.insertMany(accumulation);
  return accumulation
};

async function getAll(){
  return await Accumulation.find();
};


async function getByDeviceRuId(deviceRUid){
  return await Accumulation.find({deviceRUid:deviceRUid});
};


module.exports = { create, getAll, getByDeviceRuId};
