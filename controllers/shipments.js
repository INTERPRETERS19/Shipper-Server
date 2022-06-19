const Shipment = require("../models/shipment");
const Address = require("../models/address");
const User = require("../models/user");
const Shipper = require("../models/shipper");
const mongoose = require("mongoose");

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
    shipper_address,
    driver_assigned,
  } = req.body;

  const r_address = await Address.findById(receipient_address);
  const user = await User.findById(driver_assigned, ["fullname", "email"]);
  const shipper = await Shipper.findById(shipper_address);
  const s_address = await Address.findById(shipper.shipper_address);
  // const s_details = await Shipper.findById(shipper, ["firstName", "email"]);

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
    shipper_address: s_address,
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

exports.getCollections = async (req, res, next) => {
  const id = req.body;
  // const fullname = req.body.fullname;
  try {
    const collections = await Shipment.find({
      "driver_assigned._id": new mongoose.Types.ObjectId(id.id),
      // "driver_assigned.fullname": fullname,
      // recipient_name: id,
      // _id: id,
      current_status: "Delivered",
      COD: { $gt: 0 },
    }).select({ id: 1, COD: 1 });
    console.log(collections);
    return res.status(200).json({
      success: true,
      count: collections.length,
      data: collections,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getAllReturns = async (req, res, next) => {
  try {
    const returns = await Shipment.find({
      current_status: "FailToDeliver",
    }).select({
      id: 1,
      COD: 1,
      recipient_name: 1,
      shipment_weight: 1,
      description: 1,
      receipient_address: 1,
    });

    return res.status(200).json({
      success: true,
      count: returns.length,
      data: returns,
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
    const newShipments = await Shipment.find({
      current_status: "New",
    }).select({
      id: 1,
      COD: 1,
      recipient_name: 1,
      mobile_phone_number: 1,
      description: 1,
      created_at: 1,
      receipient_address: 1,
    });

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
