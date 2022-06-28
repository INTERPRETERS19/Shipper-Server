const Shipment = require("../models/shipment");
const User = require("../models/user");
const Shipper = require("../models/shipper");

exports.createShipment = async (req, res) => {
  const sid = req.body.shipperid;
  const {
    id,
    recipient_name,
    mobile_phone_number,
    secondary_phone_number,
    shipment_weight,
    DV,
    description,
    quantity,
    COD,
    prepaid,
    handling,
    payment_method,
    created_at,
    current_status,
    r_postal_code,
    r_no_street,
    r_district,
    r_city,
    shipper_details,
    driver_assigned,
    pickup_date,
  } = req.body;

  const user = await User.findById(driver_assigned);
  const shipper = await Shipper.findById(sid);

  const shipment = await Shipment({
    id,
    recipient_name,
    mobile_phone_number,
    secondary_phone_number,
    shipment_weight,
    DV,
    description,
    quantity,
    COD,
    prepaid,
    handling,
    payment_method,
    created_at,
    current_status,
    r_postal_code,
    r_no_street,
    r_district,
    r_city,
    shipper_details: shipper,
    driver_assigned: user,
    pickup_date,
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
  const { id } = req.params;
  try {
    const shipments = await Shipment.find({
      shipper_details: id,
    });

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
    const { id } = req.params;
    const newShipments = await Shipment.find({
      current_status: "New",
      shipper_details: id,
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
exports.getAllPickups = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pickups = await Shipment.find({
      current_status: "PickUp",
      shipper_details: id,
    });

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

exports.updateShipment = async (req, res, next) => {
  try {
    const shipments = await Shipment.updateOne(
      { _id: req.body.id },
      {
        pickup_date: req.body.value,
        current_status: "PickUp",
      }
    );
    // const shipments = await Shipment.find({ _id: req.body.id });
    return res.status(200).json({
      success: true,
      message: "Updated successfully",
      // message: shipments,
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
    const { id } = req.params;
    const returns = await Shipment.find({
      current_status: { $in: ["FailToDeliver", "Rescheduled"] },
      shipper_details: id,
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

exports.getAllDeliveredShipment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const returns = await Shipment.find({
      current_status: "Delivered",
      shipper_details: id,
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

exports.shipmentInfo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shipment = await Shipment.findById({
      _id: id,
    });
    return res.status(200).json({
      success: true,
      data: shipment,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
