const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  shippingAddress: { type: String, required: true },
  quantity: { type: String, required: true },
  paymentStatus : { type: String, required: false },
  deliveryStatus: { type: String, required: false },
  timeStamp : { type: Date, required: false },
  user_id :  { type: String, required: false },
  phonenumber :  { type: String, required: false },
  price : { type: String, required: false }
});

const Order = model("Order", orderSchema);

module.exports = Order;
