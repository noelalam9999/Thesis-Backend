const router = require("express").Router();
const ordercontroller = require("./controller/order.controller");
const paymentController = require("./controller/payment.controller");
const deliveryController = require("./controller/delivery.controller");

router.post("/order", ordercontroller.newOrder);
router.get("/order", ordercontroller.getOrder);
router.get("/order/user_id/:user_id", ordercontroller.getOrdersByUserId);
router.put("/order/:id", ordercontroller.updateOrder);
router.delete("/order/:id", ordercontroller.deleteOrder);

router.get(
  "/payment/:order_id/:amount",
  // authMiddleware.customer,
  paymentController.initPayment
);
router.post("/payment-success", paymentController.success);
router.post("/payment-failure", paymentController.failure);
router.post("/payment-cancel", paymentController.cancel);
router.post("/payment-ipn", paymentController.ipn);

router.get("/delivery/accessToken", deliveryController.pathaoAccessToken);
router.get("/delivery/cities", deliveryController.pathaoCity);
router.post("/delivery/zones", deliveryController.pathaoZones);
router.post("/delivery/areas", deliveryController.pathaoAreas);
router.post("/delivery/order", deliveryController.createOrder);
router.post("/delivery/price-calculation", deliveryController.pathaoPriceCalc);

module.exports = router;
