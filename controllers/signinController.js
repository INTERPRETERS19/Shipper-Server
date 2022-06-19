const User = require("../models/shipper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWTSecret = process.env.JWT_SECRET;
//const { createJWT } = require("../utils/auth");
const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  // if (!email) {
  //   errors.push({ email: "required" });
  //   console.log("email required");
  // }
  // if (!emailRegexp.test(email)) {
  //   errors.push({ email: "invalid email" });
  //   console.log(errors);
  // }
  // if (!password) {
  //   errors.push({ passowrd: "required" });
  //   console.log(errors);
  // }
  // if (errors.length > 0) {
  //   return res.status(422).json({ errors: errors });
  // }

  const user = await User.findOne({ email });
  // const id = await user._id;
  
  console.log(user);

  if (!user)
    return res.json({
      success: false,
      message: "user not found, with the given email!",

    });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({
      success: false,
      message: "email / password does not match!",
    });
  }
  const token = jwt.sign({ userId: user._id }, JWTSecret, {
    expiresIn: 120,

  });

  const userInfo = {
    fullname: user.fullname,
    email: user.email,
    avatar: user.avatar ? user.avatar : "",
    id: user._id,
  };

  res.json({ success: true, user: userInfo, token });
};
