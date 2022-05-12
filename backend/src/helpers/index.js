const axios = require("axios");
const path = require("path");
require("dotenv").config({ path: "../../config" });
const fs = require("fs/promises");

// exports.fetchCurrencies = async () => {
//   try {
//     const resp = await axios.get(process.env.COIN_URL + "stats");
//     return {
//       error: false,
//       // data: { BTC: resp.data[0].price, ETH: resp.data[1].price },
//       data: resp.data,
//     };
//   } catch (err) {
//     return { error: true, data: err };
//   }
// };

exports.fetchCurrencies = async () => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "..", "..", "data", "bitcoin.json")
    );

    // console.log(data);
    const Out = JSON.parse(data);

    return {
      error: false,
      // data: { BTC: resp.data[0].price, ETH: resp.data[1].price },
      data: Out.data,
    };
  } catch (err) {
    return { error: true, data: err };
  }
};

exports.currentPrice = async () => {
  try {
    const resp = await axios.get(process.env.COIN_URL + "/stats");

    // console.log(resp.data)
    return {
      error: false,
      // data: { BTC: resp.data[0].price, ETH: resp.data[1].price },
      data: resp.data.data,
    };
  } catch (err) {
    return { error: true, data: err };
  }
};

exports.MessageClient = (target, data, smsMessage) => {
  smsMessage.from = "+254718287786";
  smsMessage.to = target;
  smsMessage.body = data;

  return smsMessage;
};

exports.ErrorHandler = (msg, code) => {
  const err = new Error();
  err.statusCode = code;
  err.message = msg
  return err;
};

exports.MainError = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).json({
    error: err,
  });
};



exports.verifyJWT = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    token = token && token.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: 403,
        message: "UnAuthorized Admins Only",
      });
    }

    const payload = await generateTokenPayload(token);
    // console.log(payload);
    return res.status(200).json({
      payload,
    });
  } catch (error) {
    next(error);
  }
};

exports.generateTokenPayload = async function (token) {
  try {
    const payload = jwt.verify(token, process.env.SECRETORKEY);
    return payload;
  } catch (error) {
    // eslint-disable-next-line quotes
    defineError(`Cannot decode token error ${error}`, 500);
  }
};
