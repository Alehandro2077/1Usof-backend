const { validationResult } = require("express-validator");
const encrypt = require("../encrypt.js");
const User = require("../models/User.js");
const TokenManager = require("../service/tokens.js");

const tokenMng = new TokenManager();
const userServ = new User();

module.exports = class Auth {
  async register(req, res, next) {
    console.log("func reg");
    try {
      const { login, password, email } = req.body;
      const encryptedPassw = encrypt(password);
      const fields = { login: login, password: encryptedPassw, email: email };
      const user = userServ.createUser(fields);
      console.log("end of func reg");
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async registerAdmin(req, res, next) {
    console.log("func reg");
    try {
      const { login, password, email } = req.body;
      const encryptedPassw = encrypt(password);
      const fields = {
        login: login,
        password: encryptedPassw,
        email: email,
        role: "admin",
      };
      console.log(fields);
      const user = userServ.createUser(fields);
      console.log("end of func reg");
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      console.log("func login");
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        return next(errors);
      }
      console.log("1");
      const { login, password } = req.body;
      console.log("req body: ", req.body);
      console.log("password: ", password);
      const userData = await userServ.getUserData("login", login);
      const encryptedPassw = encrypt(password);
      console.log("2");
      console.log("user data passw: ", userData.password);
      console.log("encrypted passw: ", encryptedPassw);

      if (userData.password !== encryptedPassw) {
        return next("Username or password incorrect");
      }
      console.log("3");
      const payloadToken = {
        id: userData.id,
        role: userData.role,
      };

      const token = tokenMng.getAccessToken(payloadToken);
      userServ.saveToken(token, login);
      console.log("end of func login");
      res.json({ message: "Login successful", token });
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const { token } = req.body;
      const user = tokenMng.validateAccessToken(token);
      userServ.logout(user.id);
      res.json({ message: "User logout" });
    } catch (err) {
      next(err);
    }
  }

  async passwordReset(req, res, next) {
    try {
      const errors = validationResult(req);
      const { reset_password, reset_confirm_password } = req.body;
      if (reset_password !== reset_confirm_password) {
        errors.errors.push({
          value: "password",
          msg: "Passwords do not match",
          param: "password",
          location: "body",
        });
      }
      if (!errors.isEmpty()) {
        return next("Validation error", errors.array());
      }

      const { token } = req.body;
      const { id } = tokenMng.validateAccessToken(token);
      const encryptedPassw = encrypt(reset_password);
      await userServ.resetPassw(id, "password", encryptedPassw);

      res.json({ message: "password reset" });
    } catch (err) {
      next(err);
    }
  }
};

// async Register(req, res, next) {
//     try {
//       const { login, password, email } = req.body;
//       const encryptedPassw = encrypt(password);
//       const token = TokenManager.getAccessToken({
//         login,
//         password: encryptedPassw,
//         email,
//       });
//       next();
//     } catch (err) {
//         next(err);
//     }
//   }
