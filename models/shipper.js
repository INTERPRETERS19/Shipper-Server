const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const bcryptSalt = process.env.BCRYPT_SALT;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: { 
      type: String,
      trim: true,
      required: true,
     },
     mobile_no: { 
      type: String,
      trim: true,
      required: true,
     },
     street: { 
      type: String,
      trim: true,
      required: true,
     },
     city: { 
      type: String,
      trim: true,
      required: true,
     },
     district: { 
      type: String,
      trim: true,
      required: true,
     },
    verified: {
      type: Boolean,
       default: false,
       required: true,
       },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
  this.password = hash;
  next();
});

module.exports = mongoose.model("shipper", userSchema);
