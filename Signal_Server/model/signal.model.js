const { Schema, model } = require("mongoose");

const signalSchema = new Schema({
  deviceRUid: { type: String, required: false },
  time: { type: Date, required: false }, 
  gps: { type: String, required: false },
  gyro: { type: String, required: false },
  horn: { type: String, required: false },
});

const Signal = model("Signal", signalSchema);

async function createSignal(
  deviceRUid,
  gps,
  gyro,
  horn,
  time
){
  return await Signal.create({
    deviceRUid,
    gps,
    gyro,
    horn,
    time
  });
};

async function createSignals(signals){
  return await Signal.insertMany(signals);
};

async function getAll(){
  return await Signal.find();
};

async function getByDeviceRuId(deviceRUid){
  return await Signal.find({deviceRUid:deviceRUid});
};



async function getSignalSumByDateByDevices (deviceRUids) {
  return await Signal.aggregate([
    {
      $match : {
        $and : [
          {
            "deviceRUid" : { $in : deviceRUids}
          },
          {
            "horn" : "1"
          }  
        ] 
      },
    },
    {
      $group : {
        _id : {
            $substr : ["$time",0,10]
        },
        horn_count : {$sum : 1}
      }
    }
   
  ]);
}
async function getDevicesSumBySignalByDate (dates) {
  return await Signal.aggregate([
    {
      $match : {
        $and : [
          {
            time : { 
              $gte : new Date(dates[0]),
              $lte: new Date(dates[1])
            }
          },
          {
            "horn" : "1"
          }  
        ] 
      },
    },
    {
      $group : {
        _id : '$deviceRUid',
        horn_count : {$sum : 1}
      }
    },{
      $group : {
        _id : "$horn_count",
        "counts" : {
          $sum : 1
          // "$push" : {
          //   "v": "$_id"
          // }
        }
      }
    }
   
  ]);
}

// async function getSignalSumByDevicesByDate (dates){
//   console.log(dates[0],dates[1])
//   return await Signal.aggregate([
//     {
//       $match : {
//         $and : [
//           {
//             time : { 
//               $gte : new Date(dates[0]),
//               $lte: new Date(dates[1])
//             }
//           },
//           {
//             "horn" : "1"
//           }  
//         ] 
//       },
//     },
//     {
//       $group : {
//         _id : '$deviceRUid',
//         horn_count : {$sum : 1}
//       }
//     }
   
//   ]);
// }

module.exports = { createSignal,createSignals, getAll, getByDeviceRuId, getSignalSumByDateByDevices, getDevicesSumBySignalByDate};
