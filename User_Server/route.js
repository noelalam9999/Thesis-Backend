const usercontroller = require("./controller/user.controller");
const authMiddleware = require("./middleware/auth");
const router = require("express").Router();

router.post("/register", usercontroller.register);
router.post("/login", usercontroller.login);
router.get("/profile", authMiddleware, usercontroller.profile);
router.post("/logout", authMiddleware, usercontroller.logout);
module.exports = router;
