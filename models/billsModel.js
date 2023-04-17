const mongoose = require("mongoose");

//Item Schema for our model
const billSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerContact: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    paymentMode: {
      type: String,
      required: true,
    },
    cartItems: {
      type: Array,
      required: true,
    },
    date: {
      type: Date,
      required: Date.now(),
    },
  },
  { timestamp: true }
);

const Bills = mongoose.model("bills", billSchema);

module.exports = Bills;
