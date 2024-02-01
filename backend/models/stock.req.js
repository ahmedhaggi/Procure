// Database schema of stocks

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Stock_req = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telephone1: {
      type: String,
      required: true,
    },
    
    supplier: {
      type: String,
      required: true,
    },
    Date: {
      type: String,
      required: true,
    },
    Time: {
      type: String,
      required: true,
    },
    Quantity: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    userName:{
      type:String,
      required:true,
    }
  
  },
  {
    timestamps: true,
  }
);
const Stock_req_Schema = mongoose.model(
  "Stock_req",
  Stock_req
);
module.exports = Stock_req_Schema;
