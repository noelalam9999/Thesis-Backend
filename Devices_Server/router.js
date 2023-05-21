const router = require("express").Router();

const devicecontroller = require("./controller/device.controller");

router.post("/device", devicecontroller.postDevice);
router.get("/device", devicecontroller.getDevice);
router.get("/device/:ru_id", devicecontroller.getDeviceByid);
router.put("/device/:ru_id", devicecontroller.updateDevice);
router.delete("/device/:id", devicecontroller.deletDevice);

module.exports = router;
