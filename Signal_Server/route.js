const router = require("express").Router();
const signalcontroller = require("./controller/signal.controller");

router.post("/signal", signalcontroller.newSignal);
router.get("/signal", signalcontroller.getSignal);
router.put("/signal/:id", signalcontroller.updateSignal);
router.delete("/signal/:id", signalcontroller.deleteSignal);

module.exports = router;
