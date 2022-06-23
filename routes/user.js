const express = require("express");

const router = express.Router();
const {
  createUser,
  userSignIn,
  fetch_users,
  getUsers,
} = require("../controllers/user");

const {
  validateUserSignUp,
  userVlidation,
  validateUserSignIn,
} = require("../middlewares/validation/user");

const { profile } = require("../controllers/profileController");
const {} = require("../controllers/homeController");
router.post("/create-user", validateUserSignUp, userVlidation, createUser);
router.post("/sign-in", validateUserSignIn, userVlidation, userSignIn);
router.get("/user", fetch_users);
router.get("/allusers", getUsers);
router.get("/profile", profile);
module.exports = router;
