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

exports.getReview = async (req,res) => {
  const review = await Review.find({})
  try{
      res.status(200).json({
          status : 'Success',
          data : {
              review
          }
      })
  }catch(err){
      res.status(500).json({
          status: 'Failed',
          message : err
      })
  }
};


