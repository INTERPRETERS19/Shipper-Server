const express = require("express");

const router = express.Router();
const {
  getPending,
  getFailtoDeliver,
  getPickUp,
  getRescheduled,
  getOutForDelivery,
  getNew,
  getDelivered,
  getRecievable,
  getPayable,
} = require("../controllers/homeController");

router.get("/getpending/:id", getPending);
router.get("/getFailtoDeliver/:id", getFailtoDeliver);
router.get("/getPickUp/:id", getPickUp);
router.get("/getRescheduled/:id", getRescheduled);
router.get("/getOutForDelivery/:id", getOutForDelivery);
router.get("/getNew/:id", getNew);
router.get("/getDelivered/:id", getDelivered);
router.get("/getRecievable/:id", getRecievable);
// router.get("/getPayable/:id", getPayable);
module.exports = router;
