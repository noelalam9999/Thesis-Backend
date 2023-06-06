const router = require("express").Router();

const compnaycontroller = require("./company.controller");

router.post("/company", compnaycontroller.postCompany);
router.get("/company", compnaycontroller.getCompany);

router.put("/company/:id", compnaycontroller.updateCompany);
router.delete("/company/:id", compnaycontroller.deleteCompany);
router.get("/company/:owner", compnaycontroller.getCompanyByOwner);
router.get("/company/:id", compnaycontroller.getCompanyByCompanyId);

module.exports = router;
