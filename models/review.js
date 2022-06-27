const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  comment: {
    type: String,
  },

  rating: {
    type: Number,
    required: true,
  },
  
  email: {
    type: String,
    required: true
  },
  
});

module.exports = mongoose.model("review", ReviewSchema);
