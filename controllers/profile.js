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
