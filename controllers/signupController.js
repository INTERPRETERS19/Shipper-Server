const JWT = require("jsonwebtoken");
const User = require("../models/shipper");
const JWTSecret = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  //console.log(email);

  try {
    const oldUser = await User.findOne({ email: email });

    if (oldUser) throw new Error("Email already exist", 422);
    if (password == confirmPassword) {
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

    console.log(error);
  }
};
