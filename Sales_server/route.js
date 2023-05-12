const router = require("express").Router();
const ordercontroller = require("./controller/order.controller");
const paymentControlller = require("./controller/payment.controller")
const deliveryController = require("./controller/delivery.controller")



router.post("/order", ordercontroller.newOrder);
router.get("/order", ordercontroller.getOrder);
router.put("/order/:id", ordercontroller.updateOrder);
router.delete("/order/:id", ordercontroller.deleteOrder);


router.get(
    '/payment/:order_id/:amount',
    authMiddleware.customer,
    paymentController.initPayment
  );
  router.post('/payment-success', paymentController.success);
  router.post('/payment-failure', paymentController.failure);
  router.post('/payment-cancel', paymentController.cancel);
  router.post('/payment-ipn', paymentController.ipn);

module.exports = router;

router.get('/delivery/accessToken', deliveryController.deliveryAccessToken);
router.post('/delivery/zones', deliveryController.deliveryZones);
router.post('/delivery/areas', deliveryController.deliveryAreas);
router.post('/delivery/order', authMiddleware.lab, deliveryController.createOrder);
router.get(
  '/delivery/closest-studio',
  authMiddleware.customer,
  deliveryController.deliveryFindClosestStudio
);
router.post(
  '/delivery/price-calculation',
  authMiddleware.customer,
  deliveryController.patahaoPriceCalc
);