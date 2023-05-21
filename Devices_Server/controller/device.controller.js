const Device = require("../model/device.model");

const postDevice = async (req, res) => {
  try {
    const device = req.body;
    // const deviceConfigure = { ...device.device_configure };
    // device.device_configure = JSON.stringify(deviceConfigure);
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
    const ru_id = req.params.ru_id;
    const deviceInfo = await Device.findOne({ RU_id: ru_id });
    // console.log(deviceInfo);
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
    const { ru_id } = req.params;
    //console.log(ru_id);
    const update = req.body;

    const result = await Device.findOneAndUpdate({ RU_id: ru_id }, update, {
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
