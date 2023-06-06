const usercontroller = require("./controller/user.controller");
const oauthcontroller = require("./controller/oauth.controller");
const authMiddleware = require("./middleware/auth");
const router = require("express").Router();

//manual register and login
router.post("/register", usercontroller.register);
router.post("/google/register", usercontroller.gAuthRegister);
router.put("/updateType/:userId/:type", usercontroller.updateUserType);
router.post("/login", usercontroller.login);
router.get("/profile/:userid", usercontroller.profile);
router.post("/logout", usercontroller.logout);

//google register and login
// router.post("/google/register", oauthcontroller.oauthRegsiter);
// router.post("/google/login", oauthcontroller.oauthLogin);

module.exports = router;
