const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
<<<<<<< HEAD
const Schema = mongoose.Schema;
const bcryptSalt = process.env.BCRYPT_SALT;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: { type: String },
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

=======

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  driving_licence_no: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    required: true,
    maxLength: [10, "Max Length is 10 characters"],
    minLength: [10, "Min Length is 10 characters"],
  },
  vehicle_type: {
    type: String,
    required: true,
  },
  vehicle_reg_No: {
    type: String,
    required: true,
  },
  userAddress: {
    type: Object,
  },
  // avatar: {
  //   type: Buffer,
  //   contentType: String,
  // },
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("Password is missing, can not compare!");

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("Error while comparing password!", error.message);
  }
};

userSchema.statics.isThisEmailInUse = async function (email) {
  if (!email) throw new Error("Invalid Email");
  try {
    const user = await this.findOne({ email });
    if (user) return false;

    return true;
  } catch (error) {
    console.log("error inside isThisEmailInUse method", error.message);
    return false;
  }
};

>>>>>>> 03efb6a31ab867e71bd9cacf5ad332d2b1e10046
module.exports = mongoose.model("user", userSchema);
