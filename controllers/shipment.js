const Shipment = require("../models/shipment");
const User = require("../models/user");
const Shipper = require("../models/shipper");
const { setDriver } = require("mongoose");
const DeliveryFees = require("../models/deliveryFee");

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
    delivery_fee,
  } = req.body;
  const user = await User.findById(driver_assigned);
  const shipper = await Shipper.findById(sid);
  const feeplan = await DeliveryFees.find();
  console.log(feeplan);
  let fee = 0;
  // let std = 100;
  let std = feeplan[0].standard_fee;
  console.log(std);
  if (shipment_weight <= 3) {
    fee = feeplan[0].category1 + std;
    // fee = 400 + std;
  } else if (shipment_weight > 3 && shipment_weight <= 6) {
    fee = feeplan[0].category2 + std;
    // fee = 500 + std;
  } else if (shipment_weight > 6 && shipment_weight <= 10) {
    fee = feeplan[0].category3 + std;
    // fee = 650 + std;
  } else if (shipment_weight > 10 && shipment_weight <= 20) {
    fee = feeplan[0].category4 + std;
    // fee = 750 + std;
  } else {
    fee =
      feeplan[0].category5 +
      (shipment_weight - 20) * feeplan[0].additional +
      std;
    // fee = 1000 + (shipment_weight - 20) * 50 + std;
  }

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
    delivery_fee: fee,
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
