const accumulationmodel = require("../model/accumulation.model");
const accumulationService = require("../services/accumulation.service");
const usermodel = require("../model/user.model")

const newAccumulations = async (req, res) => {
  try {
    // const { deviceRUid, gps, gyro,time, horn } = req.body;
    
    const result = await accumulationmodel.create(req.body.deviceRUid);
    res.status(201);
    res.send(result);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

const getAccumulations = async (req, res) => {
  try {
    const accumulationInfo = await accumulationmodel.getAll();
    res.status(200);
    res.send(accumulationInfo);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

const getAccumulationsByDeviceRUid = async (req, res) => {
  const {deviceRUid} = req.params
  try {
    const accumulationInfo = await accumulationmodel.getByDeviceRuId(deviceRUid);
    res.status(200);
    res.send(accumulationInfo);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

const formAccumulations = async (req, res) => {
  try {
    const acc = await accumulationService.formAccumulations();
    res.status(200);
    res.send(acc);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
}

const getLeaderboard = async (req, res) => {
  try {
    const {deviceRUids} = req.body
    const acc = await accumulationmodel.getLeaderboard(deviceRUids);
    const users = await usermodel.getAll();
    const leaderboard = acc.map((device)=>{
      users.forEach((user)=>{
        if(user._id.valueOf()==device.user) {
          device.profilePic = user.profilePic;
          device.name = user.name;
        }
      });
      return device;
    })
    res.status(200);
    res.send(leaderboard);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
}






module.exports = {
newAccumulations,
getAccumulations,
formAccumulations,
getAccumulationsByDeviceRUid,
getLeaderboard
};
