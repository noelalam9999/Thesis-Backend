const router = require("express").Router();
const signalcontroller = require("./controller/signal.controller");

// Route naming convention

router.post("/signal", signalcontroller.newSignal);
router.post("/signals", signalcontroller.newSignals);
router.get("/signal", signalcontroller.getSignal);
router.get("/signal/:device_ru_id", signalcontroller.getSignalByRUid);

// Route naming convention [Y-axis value]By[x-axis Values]By[For]
// e.g of [For] a single device, a collection of devices, a single day or a collection of days]
router.post("/signal/SignalSumByDateByDevice", signalcontroller.getSignalSumByDateByDevice);
router.post("/signal/SignalSumByDateByDevices", signalcontroller.getSignalSumByDateByDevices);
router.post("/signal/DevicesSumBySignalByDate", signalcontroller.getDevicesSumBySignalByDate);

// router.put("/signal/:id", signalcontroller.updateSignal);
// router.delete("/signal/:id", signalcontroller.deleteSignal);

module.exports = router;
