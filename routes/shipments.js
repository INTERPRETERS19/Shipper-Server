const express = require("express");

const router = express.Router();
const {
  createShipment,
  getAllShipments,
  getCollections,
  getUsers,
  getAllReturns,
  getAllNewShipments,
  deleteShipment,
} = require("../controllers/shipments");
router.post("/createsh", createShipment);
router.get("/shipments", getAllShipments);
router.get("/collections", getCollections);
router.get("/users", getUsers);
router.get("/returns", getAllReturns);
router.get("/newships", getAllNewShipments);
router.post("/delete_shipment", deleteShipment);

module.exports = router;
