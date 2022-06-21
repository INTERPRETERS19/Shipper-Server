const Shipment = require("../models/shipment");
const Address = require("../models/address");
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

// exports.getStatus = async (req, res, next) => {
//   try {
//     const shipmentStatus = await Shipment.find(current_status);

//     return res.status(200).json({
//       success: true,
//       count: shipmentStatus.length,
//       data: shipmentStatus,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       error: "Server Error",
//     });
//   }
// };

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
    // const shipments = await Shipment.find({ _id: req.body.id });

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
      // message: shipments,
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
    const newShipments = await Shipment.find({ current_status: "New" });
    // }).select({
    //   id: 1,
    //   COD: 1,
    //   recipient_name: 1,
    //   mobile_phone_number: 1,
    //   description: 1,
    //   created_at: 1,
    //   receipient_address: 1,
    // })

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
exports.getAllPickups = async (req, res, next) => {
  try {
    const pickups = await Shipment.find({ current_status: "PickUp" });
    

    return res.status(200).json({
      success: true,
      count: pickups.length,
      data: pickups,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
