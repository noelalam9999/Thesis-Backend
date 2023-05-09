const Device = require("../model/device.model");

const postDevice = async (req, res) => {
  try {
    const device = req.body;
    const result = await Device.create(device);
    res.status(201);
    res.send(result);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

const getDevice = async (req, res) => {
  try {
    const deviceInfo = await Device.find();
    res.status(200);
    res.send(deviceInfo);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};
const getDeviceByid = async (req, res) => {
  try {
    const deviceId = req.params.id;
    const deviceInfo = await Device.findById(deviceId);
    if (!deviceInfo)
      return res.status(404).json({ message: "Device not found" });
    res.status(200);
    res.send(deviceInfo);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};
const updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const result = await Device.findByIdAndUpdate(id, update, {
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
const deletDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Device.findByIdAndDelete(id);
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error);
    console.log(error);
  }
};

module.exports = {
  postDevice,
  getDevice,
  getDeviceByid,
  updateDevice,
  deletDevice,
};
