const Shipment = require("../models/shipment");
const User = require("../models/user");
const Shipper = require("../models/shipper");

exports.createShipment = async (req, res) => {
  const {
    id,
    recipient_name,
    mobile_phone_number,
    secondary_phone_number,
    shipment_weight,
    DV,
    postal_code,
    description,
    quantity,
    COD,
    prepaid,
    handling,
    payment_method,
    created_at,
    current_status,
    receipient_address,
    shipper_details,
    driver_assigned,
  } = req.body;

  const r_address = await Address.findById(receipient_address);
  const user = await User.findById(driver_assigned, ["fullname", "email"]);
  const shipper = await Shipper.findById(shipper_details, shipper);

  const shipment = await Shipment({
    id,
    recipient_name,
    mobile_phone_number,
    secondary_phone_number,
    shipment_weight,
    DV,
    postal_code,
    description,
    quantity,
    COD,
    prepaid,
    handling,
    payment_method,
    created_at,
    current_status,
    receipient_address: r_address,
    shipper_details: shipper,
    driver_assigned: user,
  });
  await shipment.save();
  res.json({ success: true, shipment });
};
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("userAddress", "city");

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.deleteShipment = async (req, res, next) => {
  try {
    const shipments = await Shipment.deleteOne({ _id: req.body.id });

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getAllShipments = async (req, res, next) => {
  try {
    const shipments = await Shipment.find();

    return res.status(200).json({
      success: true,
      count: shipments.length,
      data: shipments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getAllNewShipments = async (req, res, next) => {
  try {
    const newShipments = await Shipment.find();
    return res.status(200).json({
      success: true,
      count: newShipments.length,
      data: newShipments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// exports.getAllPendingShipments = async (req, res, next) => {
//   try {
//     const pendingShipments = await Shipment.find({ current_status: "PickUp" } || { current_status: "New" } || { current_status: "Rescheduled" } ||{ current_status: "FailToDeliver" });
//     // }).select({
//     //   id: 1,
//     //   COD: 1,
//     //   recipient_name: 1,
//     //   mobile_phone_number: 1,
//     //   description: 1,
//     //   created_at: 1,
//     //   receipient_address: 1,
//     // })

//     return res.status(200).json({
//       success: true,
//       count: pendingShipments.length,
     
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       error: "Server Error",
//     });
//   }
// };