const jwt = require("jsonwebtoken");

const JWTSecret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // const isCustomAuth = token.length < 500;

    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, JWTSecret);
      req.userId = decodedData?.id;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
