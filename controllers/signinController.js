const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createJWT } = require("../utils/auth");
const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
exports.signin = async (req, res) => {
  let { email, password } = req.body;
  console.log(email);
  console.log(password);
  let errors = [];
  if (!email) {
    errors.push({ email: "required" });
    console.log("email required");
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "invalid email" });
    console.log(errors);
  }
  if (!password) {
    errors.push({ passowrd: "required" });
    console.log(errors);
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  await User.findOne({ email: email })
    .then((user) => {
      console.log(user);
      if (!user) {
        console.log("user not found");
        return res.status(404).json({
          errors: [{ user: "not found" }],
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              console.log("password is incorrect");
              return res
                .status(400)
                .json({ errors: [{ password: "incorrect" }] });
            }
            let access_token = createJWT(user.email, user._id, 3600);
            jwt.verify(access_token, process.env.JWT_SECRET, (err, decoded) => {
              if (err) {
                console.log("error in token");
                res.status(500).json({ erros: err });
              }
              if (decoded) {
                return res.status(200).json({
                  success: true,
                  token: access_token,
                  message: user,
                });
              }
            });
          })
          .catch((err) => {
            res.status(500).json({ erros: err });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ erros: err });
    });
};
