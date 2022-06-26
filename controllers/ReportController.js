const Report = require("../models/shipment");
const mongoose = require("mongoose");

exports.getshipmentCOD = async (req, res, next) => {
  const { id } = req.params;
 
  try {
    
    const report = await Report.find({
      shipper_details: mongoose.Types.ObjectId(id),
      current_status: "Delivered",
    }).select({ COD: 1 });
    let totalCOD = 0;
    report.forEach((data) => (totalCOD += data.COD));
   
    return res.status(200).json({
      success: true,
      totalCOD: totalCOD,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
