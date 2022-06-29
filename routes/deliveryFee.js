const express = require("express");
const { deliveryFeePlan, getFee } = require("../controllers/deliveryFee");

const router = express.Router();

router.post("/feePlan", deliveryFeePlan);
router.get("/feePlan", getFee);

module.exports = router;
