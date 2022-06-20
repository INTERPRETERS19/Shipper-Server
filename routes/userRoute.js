const {
  resetPasswordRequestController,
  resetPasswordController,
  changePasswordController,
} = require("../controllers/auth.controller");

const { signin } = require("../controllers/signinController");
const { signup } = require("../controllers/signupController");
const {
  emailVerificationController,
  requestEmailVerificationController
} = require("../controllers/emailVerificationController");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/requestResetPassword", resetPasswordRequestController);
router.post("/resetPassword", resetPasswordController);
router.post("/changePassword", changePasswordController);
router.post("/emailVerification", emailVerificationController);
router.post("/requestEmailVerification", requestEmailVerificationController);

module.exports = router;
