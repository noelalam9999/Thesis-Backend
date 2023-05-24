const Order = require("../model/order.model");

const newOrder = async (req, res) => {

  try {
    const { shippingAddress, quantity, price, phonenumber } = req.body;
    const user_id = "123";
    const timeStamp = new Date();
    const paymentStatus = "paid";
    const deliveryStatus = "pending";
    const result = await Order.create({
      shippingAddress,
      quantity,
      paymentStatus,
      deliveryStatus,
      timeStamp,
      user_id,
      phonenumber,
      price,
    });
    res.status(201);
    res.send(result);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};
const getOrder = async (req, res) => {
  try {
    const OrderInfo = await Order.find();
    res.status(200);
    res.send(OrderInfo);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const OrderInfo = await Order.find({user_id:req.params.user_id});
    res.status(200);
    res.send(OrderInfo);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

const updateOrder = async (req, res) => {

  try {
    const { id } = req.params;
    const update = req.body;

    const result = await Order.findByIdAndUpdate(id, update, {
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

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Order.findByIdAndDelete(id);
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error);
    console.log(error);
  }
};

module.exports = {
  newOrder,
  getOrder,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
};
