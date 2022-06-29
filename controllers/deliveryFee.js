const DeliveryFee = require("../models/deliveryFee");

exports.deliveryFeePlan = async (req, res) => {
  const {
    standard_fee,
    category1,
    category2,
    category3,
    category4,
    category5,
    additional,
  } = req.body;

  const fee = await DeliveryFee({
    standard_fee,
    category1,
    category2,
    category3,
    category4,
    category5,
    additional,
  });
  await fee.save();
  res.json({ success: true, fee });
};

exports.getFee = async (req, res) => {
  const fee = await DeliveryFee.find({});
  try {
    res.status(200).json({
      status: "Success",
      data: {
        fee,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
};
