const express = require("express");

const router = express.Router();
const {
  createShipment,
  getAllShipments,
  deleteShipment,
  getAllNewShipments,
  updateShipment,
  getAllReturns,
} = require("../controllers/shipment");

router.post("/createsh", createShipment);
router.get("/allshipment", getAllShipments);
router.post("/delete_shipment", deleteShipment);
router.get("/allNewshipment/:id", getAllNewShipments);
router.get("/returns/:id", getAllReturns);
router.post("/update_shipment", updateShipment);

module.exports = router;
