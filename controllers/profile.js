const Shipper = require("../models/shipper");

exports.profile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const profile = await Shipper.findById({ _id: id });
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for user" });
    }

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const uProfile = await Shipper.updateOne(
      { _id: id },
      // {
      //   email: req.body.email,
      //   firstName: req.body.firstName,
      //   lastName: req.body.lastName,
      //   mobile_no: req.body.mobile_no,
      //   street: req.body.street,
      //   city: req.body.city,
      //   district: req.body.district,
      // }
      req.body
    );
    return res.status(200).json({
      success: true,
      message: "Profile Updated successfully",
      data: uProfile,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
