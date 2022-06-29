const { cloudinary } = require("../cloudinary");
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
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile_no: req.body.mobile_no,
        street: req.body.street,
        city: req.body.city,
        district: req.body.district,
      }
      // req.body
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

exports.uploadImage = async (req, res, next) => {
  const { id } = req.params;
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "interpreters",
    });
    console.log(uploadResponse.url);

    const imgUrl = uploadResponse.url;
    const userProfile = await Shipper.updateOne(
      { _id: id },
      {
        photo: imgUrl,
      }
    );

    const profile = await Shipper.findById({ _id: id });

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: profile,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getImage = async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:interpreters")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
};
