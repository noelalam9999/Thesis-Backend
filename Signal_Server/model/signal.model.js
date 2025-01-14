const { Schema, model } = require("mongoose");

const signalSchema = new Schema({
  deviceRUid: { type: String, required: false },
  time: { type: Date, required: false },
  gps: { type: String, required: false },
  gyro: { type: String, required: false },
  horn: { type: String, required: false },
});

const Signal = model("Signal", signalSchema);

async function createSignal(deviceRUid, gps, gyro, horn, time) {
  return await Signal.create({
    deviceRUid,
    gps,
    gyro,
    horn,
    time,
  });
}

async function createSignals(signals) {
  return await Signal.insertMany(signals);
  // .then((res)=>{
  //   console.log(res)
  //   return accumulationModel.create(res)
  // }).then((res)=>{
  //   console.log(res)
  //   return res
  // });
}

async function getAll() {
  return await Signal.find();
}

async function getByDeviceRuId(deviceRUid) {
  return await Signal.find({ deviceRUid: deviceRUid });
}

async function getSignalsByTimeBrackets(dates, devices) {
  // console.log(dates)
  return await Signal.aggregate([
    {
      $facet: {
        categorizedByDeviceRUid: [
          {
            $match: {
              $and: [
                {
                  time: {
                    $gt: new Date(dates[0]),
                    $lt: new Date(dates[1]),
                  },
                },
              ],
            },
          },
          {
            $bucket: {
              groupBy: "$deviceRUid",
              boundaries: devices,
              default: "Other",
              output: {
                times: { $push: "$time" },
                coordinates: { $push: "$gps" },
                horns: { $push: "$horn" },
              },
            },
          },
        ],
      },
    },
  ]);
}

async function getSignalSumByDateByDevices(deviceRUids) {
  return await Signal.aggregate([
    {
      $match: {
        $and: [
          {
            deviceRUid: { $in: deviceRUids },
          },
          {
            horn: "1",
          },
        ],
      },
    },
    {
      $group: {
        _id: {
          $substr: ["$time", 0, 10],
        },
        horn_count: { $sum: 1 },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);
}
async function getDevicesSumBySignalByDate(dates) {
  return await Signal.aggregate([
    {
      $match: {
        $and: [
          {
            time: {
              $gte: new Date(dates[0]),
              $lte: new Date(dates[1]),
            },
          },
          {
            horn: "1",
          },
        ],
      },
    },
    {
      $group: {
        _id: "$deviceRUid",
        horn_count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: "$horn_count",
        counts: {
          $sum: 1,
          // "$push" : {
          //   "v": "$_id"
          // }
        },
      },
    },
  ]);
}

async function getSignalSumByDevicesByDate(dates) {
  return await Signal.aggregate([
    {
      $match: {
        $and: [
          {
            time: {
              $gte: new Date(dates[0]),
              $lte: new Date(dates[1]),
            },
          },
          {
            horn: "1",
          },
        ],
      },
    },
    {
      $group: {
        _id: "$deviceRUid",
        horn_count: { $sum: 1 },
      },
    },
  ]);
}
async function getSignalSumFromDeviceByDate(date, deviceRUid) {
  const dateParts = date.split("-");
  const nextDateNumber = Number(dateParts[2]) + 1;
  let endDate = "";

  if (nextDateNumber == 32)
    endDate = `${dateParts[0]}-${Number(dateParts[1]) - 1}-31`;
  else if (nextDateNumber > 0 && nextDateNumber < 10)
    endDate = `${dateParts[0]}-${dateParts[1]}-0${nextDateNumber}`;
  else endDate = `${dateParts[0]}-${dateParts[1]}-${nextDateNumber}`;

  return await Signal.aggregate([
    {
      $match: {
        $and: [
          {
            time: {
              $gt: new Date(date),
              $lte: new Date(endDate),
            },
          },
          {
            deviceRUid: deviceRUid,
          },
          {
            horn: "1",
          },
        ],
      },
    },
    {
      $group: {
        _id: "$deviceRUid",
        horn_count: { $sum: 1 },
      },
    },
  ]);
}
async function getLastSignal() {
  return await Signal.find({}).sort({ time: -1 }).limit(1);
}

// async function deleteSignals(deviceRUid,date,_id){
//   return await Signal.deleteMany({time : {$gte:new Date(date)}})
// }
async function deleteSignals() {
  return await Signal.deleteOne({ _id: "6483846409a00fc525d508ac" });
}

module.exports = {
  Signal,
  createSignal,
  createSignals,
  getAll,
  getByDeviceRuId,
  getSignalsByTimeBrackets,
  getSignalSumByDateByDevices,
  getDevicesSumBySignalByDate,
  getSignalSumByDevicesByDate,
  deleteSignals,
  getLastSignal,
  getSignalSumFromDeviceByDate,
};
