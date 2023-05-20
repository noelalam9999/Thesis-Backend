const Employee = require("./employee.model");

const postEmployee = async (req, res) => {
  try {
    const result = await Employee.create(req.body);
    res.status(201);
    console.log(result)
    res.send(result);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

const getEmployee = async (req, res) => {
  try {
    const result = await Employee.find();
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const result = await Employee.findByIdAndUpdate(id, update, {
      new: true,
    });
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.send(error);
  }
};
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employee.findByIdAndDelete(id);
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error);
    console.log(error);
  }
};

module.exports = {
  postEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
