const express = require("express");

const router = express.Router();
const {
  createShipment,
  getAllShipments,
  deleteShipment,
} = require("../controllers/shipment");

router.post("/createsh", createShipment);
router.get("/allshipment/:id", getAllShipments);
router.post("/delete_shipment", deleteShipment);

module.exports = router;
