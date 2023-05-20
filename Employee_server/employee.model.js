const { Schema, model } = require("mongoose");

const employeeSchema = new Schema({
  name: String,
  phone: String,
  department: String,
  vehicle_no: String,
  compnay: String,
  image: String
});

const Employee = model("Employee", employeeSchema);

module.exports = Employee;
