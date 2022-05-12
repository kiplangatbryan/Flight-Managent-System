var { body, validationResult } = require("express-validator");

exports.validateRegistrationReq = [
  body(["phoneNumber"])
    .isLength({ min: 8, max: 12 })
    .withMessage("cannot be empty"),
];

exports.messages = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};
