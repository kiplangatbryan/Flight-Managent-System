const assert = require("assert");

const AlertModel = require("../models/alert");
const { ErrorHandler } = require("../helpers");
const { currentPrice } = require("../helpers");

exports.getAlerts = async (req, res, next) => {
  // filtering  options later in v2

  try {
    const alerts = await AlertModel.find({ userId: req.user });

    res.status(200).json({
      success: true,
      alerts: alerts,
    });
  } catch (err) {
    next(ErrorHandler(`There was a problem: \n ${err}`, 500));
  }
};

exports.createAlert = async (req, res, next) => {
  // filtering  options later in v2

  const { currency, limit, frequency, title } = req.body;
  // after body has been validated

  const alertObj = {
    currency,
    limit,
    frequency,
    title,
    userId: req.user._id,
  };

  const Alert = new AlertModel(alertObj);

  try {
    await Alert.save();

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    next(ErrorHandler(`There was a problem: \n ${err}`, 500));
  }
};

exports.configureAlert = async (req, res, next) => {
  // /alerts/id?
  const { alert_id } = req.params;
  const { disabled, removeIt } = req.query;

  assert(
    typeof disabled != undefined || typeof removeIt != undefined,
    "atleast one option must be given"
  );

  assert(
    typeof disabled === Boolean || typeof removeIt === Boolean,
    "disabled must be  boolean value"
  );

  if (removeIt === true) {
    const result = await AlertModel.findOneAndDelete({
      _id: alert_id,
      userId: req.user,
    });

    assert(result == alert_id, "there was an issue with deleting ...");

    return status(200).json({
      success: true,
    });
  }

  if (disabled === true) {
    const alertDoc = await AlertModel.findOneAndUpdate({
      _id: alert_id,
      userId: req.user,
    });

    alertDoc.active = false;
    await alertDoc.save();

    return status(200).json({
      success: true,
    });
  }

  try {
  } catch (err) {
    next(ErrorHandler(`There was a problem: \n ${err}`, 500));
  }
};

exports.alertDaemon = async () => {
  try {
    // fetch all the alerts
    const result = await AlertModel.find();

    // fetch network data
    var { error, data } = await currentPrice();

    if (error) throw data;

    // loop through 
    for(const coin in  data){
      for(let i=0; i< result.length; i++){
        
        if (result[i].currency == data[coin]){
          // check the price at alert creation
          if(data[coin]["data"]["market_price_usd"] >= result[i].limit &&  result[i].limit > result[i].price){
            // send notification to sell
          }
          if(data[coin]["data"]["market_price_usd"] <= result[i].limit &&  result[i].limit < result[i].price){
            // send notification to buy
          }
        }
      }
    }

  } catch (err) {
    throw err;
  }
};
