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
  getAllDeliveredShipment,
} = require("../controllers/shipment");

router.post("/createsh", createShipment);
router.get("/allshipment/:id", getAllShipments);
router.get("/allPickup/:id", getAllPickups);
router.post("/delete_shipment", deleteShipment);
router.get("/allNewshipment/:id", getAllNewShipments);
router.get("/returns/:id", getAllReturns);
router.post("/update_shipment", updateShipment);
router.get("/delivered/:id", getAllDeliveredShipment);

module.exports = router;
