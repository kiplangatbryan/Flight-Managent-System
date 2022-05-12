const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../config" });
const { ErrorHandler } = require("./index");

const generateTokenPayload = async (token) => {
  try {
    const payload = jwt.verify(token, process.env.SECRET_AUTH_TOKEN);
    return payload;
  } catch (error) {
    // eslint-disable-next-line quotes
  }
};

const generateSecretKey = async (payload) => {
  try {
    const jwtToken = await jwt.sign(payload, process.env.SECRET_AUTH_TOKEN, {
      expiresIn: "3000min",
    });

    return jwtToken;
  } catch (err) {
    ErrorHandler(`Error while signing secret token ${err}`, 500);
  }
};



const clientAuthorization = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    token = token && token.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "UnAuthorized Personnel Only",
      });
    }
    const payload = await generateTokenPayload(token);

    console.log(payload)
    if (!payload) {
      return res.status(402).json({
        success: false,
        message: "UnAuthorized Personnel Only",
      });
    }
    req.user = payload;
    next();
  } catch (err) {
    ErrorHandler(`Error while signing secret token ${err}`, 500);
  }
};

module.exports = {
  generateTokenPayload,
  clientAuthorization,
  generateSecretKey,
};
