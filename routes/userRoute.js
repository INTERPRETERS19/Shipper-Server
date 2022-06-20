const {
  resetPasswordRequestController,
  resetPasswordController,
  changePasswordController,
} = require("../controllers/auth.controller");

const { signin } = require("../controllers/signinController");
const { signup } = require("../controllers/signupController");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/requestResetPassword", resetPasswordRequestController);
router.post("/resetPassword", resetPasswordController);
router.post("/changePassword", changePasswordController);

module.exports = router;
