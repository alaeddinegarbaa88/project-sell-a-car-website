const { body, validationResult } = require("express-validator");

exports.RegisterValidator = [
  body("email", "please put a vaild email").isEmail(),
  body("password", "please put a password with min 4 caract").isLength({
    min: 4,
  }),
];
exports.LoginValidator = [body("email", "please put a vaild email").isEmail()];

exports.validation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
