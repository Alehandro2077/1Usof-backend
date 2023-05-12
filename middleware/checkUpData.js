const User = require("../models/User.js");
const { validationResult } = require("express-validator");
const Token = require("../service/tokens.js");
const userDb = new User();
const tokenMng = new Token();


module.exports = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const { id, token } = req.params;
    const dataToken = tokenMng.validateAccessToken(token);
    // if (id !== dataToken.id) {
    //   next(ApiError.AccessDenied("Нou can't update another user's data"));
    // }
    const chuserEmail = await userDb.getVal(id, "email");
    const fields = req.body;
    if (fields.email !== chuserEmail.email) {
      if (await userDb.isEmailExist(fields.email)) {
        errors.errors.push({
          value: email,
          msg: "Already exist",
          param: "email",
          location: "body",
        });
      }
    }
    if (fields.login !== dataToken.login) {
      if (await userDb.isLoginExist(fields.login)) {
        errors.errors.push({
          value: login,
          msg: "Already exist",
          param: "login",
          location: "body",
        });
      }
    }

    if (!errors.isEmpty()) {
      next("Validation error", errors.array());
    }
    next();
  } catch (err) {
    next(err);
  }
};
