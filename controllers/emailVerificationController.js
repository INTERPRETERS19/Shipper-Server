const {
   emailVerification,
   requestEmailVerification,
  } = require("../services/emailVerification.service");

  const requestEmailVerificationController = async (req, res, next) => {
  const requestEmailVerificationService = await requestEmailVerification(
    req.body.email
  );
  return res.json(requestEmailVerificationService);
};

const emailVerificationController = async (req, res, next) => {
    const emailVerificationService = await emailVerification(
      req.body.userId,
      req.body.token,
    );
    return res.json(emailVerificationService);
  };
  


module.exports = {
  // signUpController,
  emailVerificationController,
  requestEmailVerificationController,
};