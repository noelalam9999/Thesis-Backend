const { Schema, model } = require("mongoose");

const employeeSchema = new Schema({
  name: String,
  phone: String,
  department: String,
  car_no: String,
  compnay: String,
});

const Employee = model("Employee", employeeSchema);

module.exports = Employee;
