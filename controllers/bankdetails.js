const Bank = require("../models/bankdetails");

exports.createBank = async (req, res) => {
  const {
    account_no,
    account_holder_name,
    branch_code,
    branch_name,
    bank_name,
    shipper_id,
  } = req.body;
  const bank = await Bank({
    account_no,
    account_holder_name,
    branch_code,
    branch_name,
    bank_name,
    shipper_id,
  });
  await bank.save();
  res.json({ success: true, bank });
};
