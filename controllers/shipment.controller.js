// const Shipment = require("../models/shipment.model");
// //const Address = require("../models/address");
// //const User = require("../models/user");
// //const Shipper = require("../models/shipper");

// const addShipment = async (req, res) => {
//   const {
//     id,
//     recipient_name,
//     mobile_phone_number,
//     secondary_phone_number,
//     shipment_weight,
//     DV,
//     postal_code,
//     description,
//     quantity,
//     COD,
//     prepaid,
//     handling,
//     payment_method,
//     created_at,
//     current_status,
//     recipient_address,
//     district,
//     city,
//     shipper_address,
//     driver_assigned,
//   } = req.body;

//   // const getShipment = async (req, res) => {
//   //   const {
//   //     id,
//   //     current_status
//   //   } = req.body;

//   //const r_address = await Address.findById(recipient_address);
//   //const user = await User.findById(driver_assigned, ["fullname", "email"]);
//   //const shipper = await Shipper.findById(shipper_address);
//   //const s_address = await Address.findById(shipper.shipper_address);

  
//   //console.log(shipment);
//   await shipment.save();
//   res.json({ success: true, shipment });
// };

// const post_shipment = async (req, res) => {
// const newType = new Shipment({
//     recipient_name:req.body.recipient_name,
//   recipient_address: req.body.recipient_address,
// shipment_weight: req.body.shipment_weight,
// mobile_phone_number: req.body.mobile_phone_number,
// district: req.body.district,
// DV: req.body.DV,
// secondary_phone_number:  req.body.secondary_phone_number,
// city: req.body.city,
// postal_code:  req.body.postal_code,
// description:  req.body.description,
// quantity: req.body.quantity,
// COD: req.body.COD,
// prepaid: req.body.prepaid,
// handling: req.body.handling,
// payment_method: req.body.payment_method
//   });

//   // const newAddress = new Address({
//   //   district: req.body.district,
//   //   city: req.body.city,
//   //   street_no: req.body.street_no,
//   // })
//   //save new job type in the database and error handling
//   try {
//     await newType.save();
//     //await newAddress.save();
//     res.status(201).json(newType);
//     //res.status(201).json(newAddress);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

// // const get_shipment = async (req, res) => {
// //   const newReturn = new Return({
// //       current_status:req.body.current_status
// //   });
// // }

// module.exports = {addShipment,post_shipment};