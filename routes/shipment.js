const express = require("express");

const router = express.Router();
const {
  createShipment,
  getAllShipments,
  deleteShipment,
  getAllNewShipments,
} = require("../controllers/shipment");

router.post("/createsh", createShipment);
router.get("/allshipment", getAllShipments);
router.get("/allNewshipment", getAllNewShipments);
router.post("/delete_shipment", deleteShipment);

module.exports = router;
