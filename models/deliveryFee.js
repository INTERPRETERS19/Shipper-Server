const mongoose = require("mongoose");

const FeeSchema = new mongoose.Schema({
  standard_fee: {
    type: Number,
    required: true,
  },

  category1: {
    type: Number,
    required: true,
  },
  category2: {
    type: Number,
    required: true,
  },
  category3: {
    type: Number,
    required: true,
  },
  category4: {
    type: Number,
    required: true,
  },
  category5: {
    type: Number,
    required: true,
  },
  additional: {
    type: Number,
    required: true
  }
  
});

module.exports = mongoose.model("deliveryfee", FeeSchema);
