const express = require("express");

const router = express.Router();
const {
  getPending,
  getFailtoDeliver,
  getPickUp,
  getPickedUp,
  getRescheduled,
  getOutForDelivery,
  getNew,
  getDelivered,
  getRecievable,
} = require("../controllers/homeController");
const {getshipmentCOD} =require("../controllers/ReportController");

router.get("/getpending/:id", getPending);
router.get("/getFailtoDeliver/:id", getFailtoDeliver);
router.get("/getPickUp/:id", getPickUp);
router.get("/getPickedUp/:id", getPickedUp);
router.get("/getRescheduled/:id", getRescheduled);
router.get("/getOutForDelivery/:id", getOutForDelivery);
router.get("/getNew/:id", getNew);
router.get("/getDelivered/:id", getDelivered);
router.get("/getRecievable/:id", getRecievable);
router.get("/getshipmentCOD/:id", getshipmentCOD);
module.exports = router;
