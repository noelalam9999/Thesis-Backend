const { Schema, model } = require("mongoose");
// const {Signal} = require("./signal.model");
const Distance = require('geo-distance');
const { Signal } = require("./signal.model");

const accumulationSchema = new Schema({
  deviceRUid: { type: String, required: false },
  time: { type: Date, required: false }, 
  totalTime: { type: Number, required: false }, 
  totalDistance: { type: Number, required: false },
  totalHorns: { type: String, required: false },
});

const Accumulation = model("Accumulation", accumulationSchema);

async function create(signals){
  
    // const lastAcc = await Accumulation.find({deviceRUid:signals[0].deviceRUid}).sort(); 
    const lastAcc = await getLastAccumulation(signals[0].deviceRUid);
    console.log(lastAcc)
    const lastRecord = lastAcc[0];
  
    let accumulation = [];

    if (lastAcc.length == 0 ){

        accumulation.push({
        deviceRUid : signals[0].deviceRUid,
        time : signals[0].time,
        totalDistance : 0,
        totalTime : 0,
        totalHorns : 0,
      });
  
      if(signals.length ===1){
        return await Accumulation.insertMany(accumulation);
      }
      else {
        calcManySignals();
        return await Accumulation.insertMany(accumulation);
      }
    }


    else{
      // const lastSignal = await Signal.find({deviceRUid:signals[0].deviceRUid}); 
      const lastSignal = await getLastSignal(signals[0].deviceRUid);
      console.log(lastSignal)
      const timeDifference = (new Date(signals[0].time) - new Date(lastSignal[lastSignal.length-1]))// time diff between last signal and new signal
      // if(timeDifference > 1000 * 60 * 3){

      // }
      
      accumulation.push({
      deviceRUid : lastRecord.deviceRUid,
      time : lastRecord.time,
      totalDistance : lastRecord.totalDistance,
      totalTime : lastRecord.totalTime,
      totalHorns : lastRecord.totalHorns,
    });

    if(signals.length === 1){
      
  
      accumulation.push({
        deviceRUid : signals[0].deviceRUid,
        time : signals[0].time,
        totalDistance : lastRecord.totalDistance + Number(Distance.between(
          {
            lat : signals[0].gps.split(':')[0],
            long : signals[0].gps.split(':')[1]
          },
          {
            lat : lastSignal[0].gps.split(':')[0],
            long : lastSignal[0].gps.split(':')[1]
          }
         )),
        totalTime : lastRecord.totalTime + ((new Date(signals[0].time) - new Date(lastSignal[0].time))/3600000),
        totalHorns : parseInt(lastRecord.totalHorns) + parseInt(lastSignal[lastSignal.length-1].horn),
        })

      return await Accumulation.insertMany(accumulation.slice(1));
    }

    else {
      calcManySignals()
      return await Accumulation.insertMany(accumulation.slice(1));
    }

    }
    
    


    function calcManySignals(){
      for (let i = 1; i < signals.length ; i++){
  
        accumulation.push({
        deviceRUid : signals[i].deviceRUid,
        time : signals[i].time,
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
    }
    
  // return await Accumulation.insertMany(accumulation);
  return accumulation
};

async function getLastSignal (deviceRUid){
    return await Signal.find({deviceRUid:deviceRUid}).sort({time: -1}).limit(1);
  }

  async function getLastAccumulation (deviceRUid){
    return await Accumulation.find({deviceRUid:deviceRUid}).sort({time: -1}).limit(1);
  }


async function getAll(){
  return await Accumulation.find();
};


async function getByDeviceRuId(deviceRUid){
  return await Accumulation.find({deviceRUid:deviceRUid});
};


module.exports = { create, getAll, getByDeviceRuId};
