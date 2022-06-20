const JWT = require("jsonwebtoken");
const Shipper = require("../models/shipper");
// const Token = require("../models/Token.model");
// const sendEmail = require("../utils/email/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
// const {
//   emailVerification
// } = require("../services/emailVerification.service");

const JWTSecret = process.env.JWT_SECRET;
const bcryptSalt = process.env.BCRYPT_SALT;

exports.signup = async (req, res) => {
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

    console.log(error);
  }
};
