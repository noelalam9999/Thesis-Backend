const signalmodel = require("../model/signal.model");

const newSignal = async (req, res) => {
  try {
    const { deviceRUid, gps, gyro,time, horn } = req.body;
    
    const result = await signalmodel.createSignal(
      deviceRUid,
      gps,
      gyro,
      horn,
      time
    );
    res.status(201);
    res.send(result);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

const newSignals = async (req, res) => {
  try {
    // const { deviceRUid, gps, gyro,time, horn } = req.body;
    
    const result = await signalmodel.createSignals(req.body);
    res.status(201);
    res.send(result);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

const getSignal = async (req, res) => {
  try {
    const signalInfo = await signalmodel.getAll();
    res.status(200);
    res.send(signalInfo);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

const getSignalByRUid = async (req, res) => {
  try {
    const signalInfo = await signalmodel.getByDeviceRuId(req.params.device_ru_id);
    res.status(200);
    res.send(signalInfo);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};
//For charts that need daily horn count
const getSignalSumByDateByDevice = async (req, res) => {
   console.log(req.body.deviceRUid)
  try {
    const signalInfo = await signalmodel.getSumByDateByDevice(req.body.deviceRUid);
    res.status(200);
    res.send(signalInfo);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

const getSignalSumByDateByDevices = async (req, res) => {
  console.log(req.body.deviceRUids)
 try {
   const signalInfo = await signalmodel.getSignalSumByDateByDevices(req.body.deviceRUids);
   res.status(200);
   res.send(signalInfo);
 } catch (error) {
   res.status(400);
   res.send(error);
   console.log(error);
 }
};
const getDevicesSumBySignalByDate = async (req, res) => {
 try {
   const devicesSumBySignalByDate = await signalmodel.getDevicesSumBySignalByDate(req.body.dates);
   res.status(200);
   res.send(devicesSumBySignalByDate);
 } catch (error) {
   res.status(400);
   res.send(error);
   console.log(error);
 }
};

// const updateSignal = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const update = req.body;

//     const result = await Signal.findByIdAndUpdate(id, update, {
//       new: true,
//     });
//     res.status(200);
//     res.send(result);
//   } catch (error) {
//     res.status(500);
//     console.log(error);
//     res.send(error);
//   }
// };

// const deleteSignal = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await Signal.findByIdAndDelete(id);
//     res.status(200);
//     res.send(result);
//   } catch (error) {
//     res.status(500);
//     res.send(error);
//     console.log(error);
//   }
// };

module.exports = {
  newSignal,
  newSignals,
  getSignal,
  getSignalByRUid,
  getSignalSumByDateByDevice,
  getSignalSumByDateByDevices,
  getDevicesSumBySignalByDate

};
