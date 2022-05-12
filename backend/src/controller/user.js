const assert = require("assert");
const userModel = require("../models/user");
const { ErrorHandler } = require("../helpers");
const { generateSecretKey } = require("../helpers/utils");

const smsNotify = require("../notify/twilio-sms");

exports.validateUser = async (req, res, next) => {
  const { phoneNumber } = req.body;
  console.table(req.body)

    
  assert(phoneNumber != undefined, "phoneNumber is empty");
  try {
    const userDoc = await userModel.find({ phoneId: phoneNumber });

    if (userDoc.length > 0) {
      return res.status(200).json({
        success: false,
        msg: "username taken",
      });
    }

    const message = await smsNotify(
      "+254" + parseInt(phoneNumber),
      "code: 1234"
    );
    
    console.log('check for sent code');

    if (message.status == "success") {
      return res.status(200).json({
        success: true,
        phoneNumber
      });
    }
  } catch (err) {
    next(ErrorHandler(`There was a problem: \n ${err}`, 500));
  }
};

exports.checkUser = async (req, res, next) => {
  console.table(req.body);
  const { phoneNumber } = req.body;

  assert(phoneNumber != undefined, "phoneNumber is empty");

  try {
    // check if a user exists
    const userDoc = await userModel.find({ phoneId: phoneNumber });

    if (userDoc.length > 0) {
      return res.status(200).json({
        success: false,
        msg: 'taken',
      });
    }

    return res.status(200).json({
      success: true,
      msg: 'new_user'
    });
  } catch (err) {
    next(ErrorHandler(`There was a problem: \n ${err}`, 500));
  }
  
}

exports.createUser = async (req, res, next) => {
  console.table(req.body);
  const { phoneNumber, code } = req.body;

  // confirm the code
  if (code != "1234") {
    return res.status(401).json({
      success: false,
      msg: "code verification failed",
    });
  }

  assert(phoneNumber != undefined, "phoneNumber is empty");

  try {
    // check if a user exists
    const userDoc = await userModel.find({ phoneId: phoneNumber });

    if (userDoc.length > 0) {
      return res.status(200).json({
        success: false,
        msg: "username taken",
      });
    }
    const user = new userModel({ phoneId: phoneNumber });
    const token = await generateSecretKey({ uname: phoneNumber });

    await user.save();

    return res.status(200).json({
      success: true,
      token,
      phoneNumber,
    });
  } catch (err) {
    next(ErrorHandler(`There was a problem: \n ${err}`, 500));
  }
};
