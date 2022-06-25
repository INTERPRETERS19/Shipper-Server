const express = require("express");

const router = express.Router();
const {
  createShipment,
  getAllShipments,
  deleteShipment,
  getAllNewShipments,
  getAllPickups,
  updateShipment,
  getAllReturns,
  // trackShipment
} = require("../controllers/shipment");

router.post("/createsh", createShipment);
router.get("/allshipment/:id", getAllShipments);
router.get("/allNewshipment", getAllNewShipments);
router.get("/allPickup/:id", getAllPickups);
router.post("/delete_shipment", deleteShipment);
router.get("/allNewshipment/:id", getAllNewShipments);
router.get("/returns/:id", getAllReturns);
router.post("/update_shipment", updateShipment);
// router.get("/track", trackShipment)

module.exports = router;
