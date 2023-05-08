const usercontroller = require("./controller/user.controller");
const router = require("express").Router();

router.post("/register", usercontroller.register);
router.post("/login", usercontroller.login);
module.exports = router;
