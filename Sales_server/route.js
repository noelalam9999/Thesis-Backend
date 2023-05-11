const router = require("express").Router();
const ordercontroller = require("./controller/order.controller");

router.post("/order", ordercontroller.newOrder);
router.get("/order", ordercontroller.getOrder);
router.put("/order/:id", ordercontroller.updateOrder);
router.delete("/order/:id", ordercontroller.deleteOrder);

module.exports = router;
