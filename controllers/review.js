const Review = require("../models/review");

exports.addReview = async (req, res) => {
  
  const {
    name,
    comment,
    rating,
    email   
  } = req.body;

  const review = await Review({
    name,
    comment,
    rating,
    email
  });
  await review.save();
  res.json({ success: true, review });
};