const router = require("express").Router();

const compnaycontroller = require("./company.controller");

router.post("/company", compnaycontroller.postCompany);
router.get("/company", compnaycontroller.getCompany);

router.put("/company/:id", compnaycontroller.updateCompany);
router.delete("/company/:id", compnaycontroller.deleteCompany);

module.exports = router;
