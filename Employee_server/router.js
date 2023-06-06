const router = require("express").Router();

const employeecontroller = require("./employe.controller");

router.get("/employee", employeecontroller.getEmployee);
router.get("/employee", employeecontroller.getEmployee);
router.post("/employee", employeecontroller.postEmployee);
router.put("/employee/:id", employeecontroller.updateEmployee);
router.delete("/employee/:id", employeecontroller.postEmployee);
//Asif
router.get("/employee/:companyId", employeecontroller.getAllEmployeeByCompany);

module.exports = router;
