const Profile = require("../models/shipper");

exports.profile = async (req, res, next) => {
  // const email = Profile.email;
  // const value = req.body;
  // console.log(value);
  try {
    const profile = await Profile.findOne(req.body);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
