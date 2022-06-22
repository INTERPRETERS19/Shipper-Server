const JWT = require("jsonwebtoken");
<<<<<<< HEAD
const User = require("../models/shipper");
=======
const Shipper = require("../models/shipper");
>>>>>>> 03efb6a31ab867e71bd9cacf5ad332d2b1e10046
// const Token = require("../models/Token.model");
// const sendEmail = require("../utils/email/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
<<<<<<< HEAD
=======
// const {
//   emailVerification
// } = require("../services/emailVerification.service");
>>>>>>> 03efb6a31ab867e71bd9cacf5ad332d2b1e10046

const JWTSecret = process.env.JWT_SECRET;
const bcryptSalt = process.env.BCRYPT_SALT;

exports.signup = async (req, res) => {
<<<<<<< HEAD
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  console.log(email);

  try {
    const oldUser = await User.findOne({ email: email });

    if (oldUser) throw new Error("Email already exist", 422);
    if (password == confirmPassword) {
      // const hashedPassword = await bcrypt.hash(password, Number(bcryptSalt));

      const result = await User.create({
        email,
        password,
        firstName,
        lastName,
      });

      const token = JWT.sign({ id: result._id }, JWTSecret);
      data = {
        userId: result._id,
        email: result.email,
        firstName: result.firstName,
        token: token,
      };
      return res.status(200).json({
        success: true,
        token: token,
        message: data,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
=======
  const { email, password, firstName, lastName ,street, city, district, mobile_no} = req.body;
  console.log(email);

  try {
    const oldUser = await Shipper.findOne({ email: email });
    if (oldUser) {
      return res.json({
        message: "email / password does not match!",
      });
    }
    if (oldUser) throw new Error("Email already exist", 422);

    const result = await Shipper.create({
      email,
      password,
      firstName,
      lastName,
      street,
      city,
      district,
      mobile_no
    });

    const token = JWT.sign({ id: result._id }, JWTSecret);
    data = {
      userId: result._id,
      email: result.email,
      firstName: result.firstName,
      token: token,
    };
    return res.status(200).json({
      success: true,
      token: token,
      message: data,
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong3" });
>>>>>>> 03efb6a31ab867e71bd9cacf5ad332d2b1e10046

    console.log(error);
  }
};
