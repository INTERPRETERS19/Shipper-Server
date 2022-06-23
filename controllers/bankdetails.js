const Bank = require("../models/bankdetails");
const Shipper = require("../models/shipper");

exports.createBank = async (req, res) => {
  const {
    account_no,
    account_holder_name,
    branch_code,
    branch_name,
    bank_name,
    shipper_id,
  } = req.body;

  const shipper = await Shipper.findById(shipper_id);
  const bank = await Bank({
    account_no,
    account_holder_name,
    branch_code,
    branch_name,
    bank_name,
    shipper_id: shipper,
  });
  await bank.save();
  res.json({ success: true, bank });
};

exports.getAllBankDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const bankdetails = await Bank.find({
      shipper_id: id,
    });

    return res.status(200).json({
      success: true,
      data: bankdetails,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.deleteBank = async (req, res, next) => {
  const { id } = req.params;
  try {
    const bankdetails = await Bank.deleteOne({
      shipper_id: id,
    });

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.updateBank = async (req, res, next) => {
  const { id } = req.params;
  try {
    const bankdetails = await Bank.updateOne({ _id: id }, req.body);

    return res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: bankdetails,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
