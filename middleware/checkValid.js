const { validationResult } = require("express-validator");
const User = require("../models/User.js");
const user = new User();

//////
module.exports = async (req, _res, next) => {
  console.log("func check valid");
  const { login, password, passwordConfirm, email } = req.body;
  const errors = validationResult(req);

  if (await user.isEmailExist(email)) {
    console.log("valid 1");
    errors.errors.push({
      value: email,
      msg: "Already exist",
      param: "email",
      location: "body",
    });
  }

  if (await user.isLoginExist(login)) {
    console.log("valid 2");
    errors.errors.push({
      value: login,
      msg: "Already exist",
      param: "login",
      location: "body",
    });
  }

  if (password !== passwordConfirm) {
    console.log("valid 3");
    errors.errors.push({
      value: "password",
      msg: "Passwords do not match",
      param: "password",
      location: "body",
    });
  }

  if (!errors.isEmpty()) {
    return next("Validation error");
  }

  console.log("end of func validation");
  next();
};
