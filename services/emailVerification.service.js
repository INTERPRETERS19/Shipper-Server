const JWT = require("jsonwebtoken");
const User = require("../models/shipper");
const Token = require("../models/Token.model");
const { sendEmail } = require("../utils/email/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const JWTSecret = process.env.JWT_SECRET;
const bcryptSalt = process.env.BCRYPT_SALT;
const clientURL = process.env.CLIENT_URL;

const signup = async (data) => {
  let user = await User.findOne({ email: data.email });
  if (user) {
    throw new Error("Email already exist", 422);
  }
  user = new User(data);
  const token = JWT.sign({ id: user._id }, JWTSecret);
  await user.save();

  return (data = {
    userId: user._id,
    email: user.email,
    name: user.name,
    token: token,
  });
};

const requestEmailVerification = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Email does not exist");
    return { success: false, error: error };
  }

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `localhost:3000/emailVerification?token=${resetToken}&id=${user._id}`;
  

  sendEmail(
    user.email,
    "Email verification Request",
    {
      name: user.name,
      link: link,
    },
    "./template/emailVerify.handlebars"
  );
  return { link: link, success: true };
};

const emailVerification = async (userId, token) => {
  let emailVerificationToken = await Token.findOne({ userId });

  if (!emailVerificationToken) {
    const error = new Error("Invalid or expired token");
    return false;
  }

  const isValid = await bcrypt.compare(token, emailVerificationToken.token);

  if (!isValid) {
    const error = new Error("Invalid or expired token");
    return false;
  }

  await User.updateOne(
    { _id: userId },
    { $set: { verified: true } },
  );

  const user = await User.findById({ _id: userId });

  sendEmail(
    user.email,
    "Account created Successfully",
    {
      name: user.name,
    },
    "./template/resetPassword.handlebars"
  );

  await emailVerificationToken.deleteOne();

  return true;
};

module.exports = {
  requestEmailVerification,
  emailVerification,

};