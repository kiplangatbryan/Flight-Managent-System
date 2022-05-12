const router = require("express").Router();

const {
  createAlert,
  configureAlert,
  getAlerts,
} = require("../controller/alerts");


const { fetchCurrencies } = require("../helpers");

const { createUser, validateUser } = require("../controller/user");

const { validateRegistrationReq } = require("../helpers/validation");
const { clientAuthorization } = require("../helpers/utils");

router.get("/fetch-alerts", clientAuthorization, getAlerts);
router.get("/edit-alert", clientAuthorization, configureAlert);
router.post("/create-alert",  validateUser);

router.post("/verify", validateUser);
router.post("/create-user", validateRegistrationReq, createUser);



module.exports = router;
