// const mongoose = require("mongoose");
// const Nanoid = require("nanoid");

// const ShipmentSchema = new mongoose.Schema({
//   id: {
//     type: String,
//     default: () => Nanoid.nanoid(8),
//   },
//   recipient_name: {
//     type: String,
//     required: true,
//   },
//   recipient_address: {
//     type: String,
//     required: true,
//   },

//   //recipient_address: [{ no_street: String, district: String, city: String }],

//   shipment_weight: {
//     type: Number,
//     required: true,
//   },

//   mobile_phone_number: {
//     type: String,
//     required: true,
//   },
//   district: {
//     type: String,
//     required: true,
//   },
//   secondary_phone_number: {
//     type: String,
//   },

//   city: {
//     type: String,
//     required: true,
//   },

//   DV: {
//     type: Number,
//   },

//   postal_code: {
//     type: Number,
//   },

//   description: {
//     type: String,
//     required: true,
//   },

//   quantity: {
//     type: Number,
//     required: true,
//   },

//   COD: {
//     type: Number,
//     default: 0,
//     required: true,
//   },

//   prepaid: {
//     type: String,
//     required: true,
//   },

//   handling: {
//     type: String,
//     required: true,
//   },

//   payment_method: {
//     type: String,
//     required: true,
//   },

//   created_at: {
//     type: Date,
//     //required: true,
//     default: Date.now,
//   },
//   current_status: {
//     type: String,
//     default: "New",
//   },

//   // recipient_address: {
//   //   type: mongoose.Types.ObjectId,
//   //   ref: "addresses",
//   // },
//   shipper: {
//     type: Object,
//     default: null,
//   },
//   driver_assigned: {
//     type: mongoose.Types.ObjectId,
//     ref: "user",
//   },
// });

// module.exports = mongoose.model("shipment", ShipmentSchema);
