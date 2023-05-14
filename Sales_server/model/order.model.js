const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  shippingAddress: {
    city : {
      city: {type: String, required: true},
      id : {type: Number, required: true}
    },
    zone : {
      zone_id : {type: Number, required: true},
      zone_name : {type: String, required: true}
    },
    area : {
      area_id : {type: Number, required: false},
      area_name : {type: String, required: true}
    },
    fullAddress : {type: String, required: false}
  },
  quantity: { type: Number, required: true },
  paymentStatus : { type: String, required: false },
  deliveryStatus: { type: String, required: false },
  timeStamp : { type: Date, required: false },
  user_id :  { type: String, required: false },
  phonenumber :  { type: String, required: false },
  price : { type: String, required: false }
});

const Order = model("Order", orderSchema);

module.exports = Order;
