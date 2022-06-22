const Shipment = require("../models/shipment");
const mongoose = require("mongoose");

exports.getPending = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dataP = await Shipment.find({
      shipper_details: mongoose.Types.ObjectId(id),
      current_status: {
        $in: ["PickUp", "Rescheduled", "OutForDelivery"],
      },
    });
    console.log(dataP);
    return res.status(200).json({
      success: true,
      count: dataP.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getFailtoDeliver = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dataP = await Shipment.find({
      shipper_details: mongoose.Types.ObjectId(id),
      current_status: "FailToDeliver",
    });
    console.log(dataP);
    return res.status(200).json({
      success: true,
      count: dataP.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getPickUp = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dataP = await Shipment.find({
      shipper_details: mongoose.Types.ObjectId(id),
      current_status: "PickUp",
    });
    console.log(dataP);
    return res.status(200).json({
      success: true,
      count: dataP.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getRescheduled = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dataP = await Shipment.find({
      shipper_details: mongoose.Types.ObjectId(id),
      current_status: "Rescheduled",
    });
    console.log(dataP);
    return res.status(200).json({
      success: true,
      count: dataP.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getOutForDelivery = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dataP = await Shipment.find({
      shipper_details: mongoose.Types.ObjectId(id),
      current_status: "OutForDelivery",
    });
    console.log(dataP);
    return res.status(200).json({
      success: true,
      count: dataP.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getNew = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dataP = await Shipment.find({
      shipper_details: mongoose.Types.ObjectId(id),
      current_status: "New",
    });
    console.log(dataP);
    return res.status(200).json({
      success: true,
      count: dataP.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getDelivered = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dataP = await Shipment.find({
      shipper_details: mongoose.Types.ObjectId(id),
      current_status: "Delivered",
    });
    console.log(dataP);
    return res.status(200).json({
      success: true,
      count: dataP.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// exports.getPayable = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const dataP = await Shipment.find({
//       shipper_details: mongoose.Types.ObjectId(id),
//       current_status: "Delivered",
//     });
//     console.log(dataP);
//     return res.status(200).json({
//       success: true,
//       count: dataP.length,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       error: "Server Error",
//     });
//   }
// };

exports.getRecievable = async (req, res, next) => {
  const { id } = req.params;
  try {
    const datapy = await Shipment.find({
      shipper_details: mongoose.Types.ObjectId(id),
      current_status: "Delivered",
    }).select({ COD: 1 });
    let total = 0;
    datapy.forEach((data) => (total += data.COD));
    return res.status(200).json({
      success: true,
      total: total,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
