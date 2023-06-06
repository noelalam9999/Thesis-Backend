const accumulationmodel = require("../model/accumulation.model");


const newAccumulations = async (req, res) => {
  try {
    // const { deviceRUid, gps, gyro,time, horn } = req.body;
    
    const result = await accumulationmodel.create(req.body);
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





module.exports = {
newAccumulations,
getAccumulations

};
