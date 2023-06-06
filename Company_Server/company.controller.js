const Company = require("./company.model");

const getCompany = async (req, res) => {
  try {
    const result = await Company.find({});
    res.send(result);
    res.status(200);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

const postCompany = async (req, res) => {
  try {
    const company = req.body;

    const result = await Company.create(company);
    res.status(201);
    res.send(result);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

const updateCompany = async (req, res) => {
  console.log("hii");
  try {
    const { id } = req.params;
    const update = req.body;

    const result = await Company.findByIdAndUpdate(id, update, {
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

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Company.findByIdAndDelete(id);
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error);
    console.log(error);
  }
};

const getCompanyByOwner = async (req, res) => {
  const {owner} = req.params;
  try {
    const result = await Company.find({owner: owner});
    res.send(result);
    res.status(200);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};
const getCompanyByCompanyId = async (req, res) => {
  const {id} = req.params;
  try {
    const result = await Company.find({_id: id});
    res.send(result);
    res.status(200);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

module.exports = {
  getCompany,
  postCompany,
  updateCompany,
  deleteCompany,
  getCompanyByOwner,
  getCompanyByCompanyId
};
