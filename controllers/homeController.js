const Shipment = require("../models/shipment");
const mongoose = require("mongoose");

exports.getPending = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dataP = await Shipment.find({
      shipper_details: mongoose.Types.ObjectId(id),
      current_status: {
        $in: ["PickUp", "Rescheduled", "FailToDeliver", "OutForDelivery"],
      },
    });
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

exports.getPayable = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dataP = await Shipment.find({
      shipper_details: mongoose.Types.ObjectId(id),
      current_status: "Delivered",
    });
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

exports.getRecievable = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dataP = await Shipment.find({
      shipper_details: mongoose.Types.ObjectId(id),
      current_status: {
        $in: ["PickUp", "Rescheduled", "FailToDeliver", "OutForDelivery"],
      },
    });
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

exports.getPayable = async (req, res, next) => {
  const { id } = req.params;
  try {
    const datapy = await Shipment.find({
      shipper_details: mongoose.Types.ObjectId(id),
      current_status: {
        $in: ["PickUp", "Rescheduled", "FailToDeliver", "OutForDelivery"],
      },
      COD: { $gt: 0 },
    });
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
