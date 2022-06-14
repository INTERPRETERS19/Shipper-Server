const {
  signUpController,
  resetPasswordRequestController,
  resetPasswordController,
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/signup", signUpController);
router.post("/requestResetPassword", resetPasswordRequestController);
router.post("/resetPassword", resetPasswordController);

module.exports = router;
