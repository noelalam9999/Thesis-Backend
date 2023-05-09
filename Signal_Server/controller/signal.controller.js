const Signal = require("../model/signal.model");

const newSignal = async (req, res) => {
  try {
    const { deviceId, gps, acceleration } = req.body;
    const timeStamp = new Date();
    const result = await Signal.create({
      deviceId,
      gps,
      acceleration,
      timeStamp,
    });
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
    const signalInfo = await Signal.find();
    res.status(200);
    res.send(signalInfo);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

const updateSignal = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const result = await Signal.findByIdAndUpdate(id, update, {
      new: true,
    });
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.send(error);
  }
};

const deleteSignal = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Signal.findByIdAndDelete(id);
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error);
    console.log(error);
  }
};

module.exports = {
  newSignal,
  getSignal,
  updateSignal,
  deleteSignal,
};
