const express = require("express");
const {
  createBank,
  getAllBankDetails,
  updateBank,
  deleteBank,
} = require("../controllers/bankdetails");
const router = express.Router();

router.post("/bank", createBank);
router.get("/allbank/:id", getAllBankDetails);
router.post("/deletebank/:id", deleteBank);
router.post("/updatebank/:id", updateBank);
module.exports = router;
