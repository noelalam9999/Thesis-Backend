const { Schema, model } = require("mongoose");
// const {Signal} = require("./signal.model");
const { Signal } = require("./signal.model");

const accumulationSchema = new Schema({
  deviceRUid: { type: String, required: false },
  time: { type: Date, required: false }, 
  totalTime: { type: Number, required: false }, 
  totalDistance: { type: Number, required: false },
  totalHorns: { type: Number, required: false },
});

const Accumulation = model("Accumulation", accumulationSchema);

const accumulationTimeSchema = new Schema({
  lastUpdated : {type : Date, required : false}
})
const AccumulationTime = model("AccumulationTime", accumulationTimeSchema);


async function create(deviceRUid){
  return await Accumulation.create({
    deviceRUid,
    totalTime:0,
    totalDistance:0,
    totalHorns:0,
  });
};

async function getLastAccumulation (deviceRUid){
  return await Accumulation.find({_id:"647a6e7e773ea8980a4b30ba"}).sort({time: -1}).limit(1);
}

async function updateAccumulationTime(time){
  return await Accumulation.updateOne({_id:"647a6e7e773ea8980a4b30ba"},{
    time : time
  })
}

async function getAll(){
  return await Accumulation.find();
};


async function getByDeviceRuId(deviceRUid){
  return await Accumulation.find({deviceRUid:deviceRUid});
};

async function updateAccumulation(acc){
  return await Accumulation.updateOne({deviceRUid:acc.deviceRUid},{
    $inc : {
      totalDistance : acc.totalDistance,
      totalHorns : acc.totalHorns,
      totalTime : acc.totalTime
    }
  }, {
    new : true
  });
}



async function getAccumulationTime(){
  return await AccumulationTime.find({_id:"648369097ce79ae7b9d7c15c"},{time:1});
}

async function getLeaderboard(deviceRUids){
   
   return await Accumulation.aggregate([
    {
      $lookup : {
        from : "devices",
        localField : "deviceRUid",
        foreignField : "RU_id",
        as : "device"
      }
    },
    { $unwind:"$device" }, 
    // {
    //   $addFields: {"device.user_id" : "$device"}
    // },
    // {
    //   $lookup : {
    //     from : "users",
    //     localField : "device.user_id",
    //     foreignField : "_id",
    //     as : "user"
    //   }
    // },
    // {  
    //   $unwind:"$device.user" 
    // }, 
    {
        $match: {
          $and : [
            {
              "deviceRUid" : {
                $in : deviceRUids
              }
            },
            {
              "totalDistance" : {
                $gte : 1
              }
            }
          ] 
        },
    },
    {
        $project: {
            // Need to prefix fields with '$'
            deviceRUid : "$device.RU_id",
            user : "$device.user_id",
            // name : "$device.user.name",
            // profilepicture : "$device.user.profilepicture",
            ratio: { $divide: [ "$totalHorns", "$totalDistance"] },
        }
    },
    {
        $sort: { ratio: -1 },
    }
    ]);
}


module.exports = { 
  create, 
  getAll, 
  getByDeviceRuId, 
  updateAccumulation, 
  getLastAccumulation, 
  updateAccumulationTime,
  getAccumulationTime,
  getLeaderboard
};
