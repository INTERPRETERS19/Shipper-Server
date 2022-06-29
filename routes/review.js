const express = require("express");

const router = express.Router();
const { addReview, getReview } = require("../controllers/review");

router.post("/review", addReview);
router.get("/review", getReview);

module.exports = router;
