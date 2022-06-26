const express = require("express");

const router = express.Router();
const { addReview } = require("../controllers/review");

router.post("/review", addReview);

module.exports = router;
