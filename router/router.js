const express = require("express");
const { body } = require("express-validator");

const db = require("../db.js");
const User = require("../models/User.js");
const Auth = require("../controller/auth.js");
const userController = require("../controller/user_controller.js");
const checkValid = require("../middleware/checkValid.js");
const checkAdminAccess = require("../middleware/checkAdminAccess.js");
const checkUpData = require("../middleware/checkUpData.js");

const auth = new Auth();
const dbUser = new User();
const router = express.Router();

///auth register

router.post(
  "/auth/register",
  body("login").isLength({ min: 6, max: 30 }).trim(),
  body("password").isLength({ min: 8 }).trim(),
  body("passwordConfirm").isLength({ min: 8 }).trim(),
  body("email").isEmail().normalizeEmail().trim(),
  checkValid,
  auth.register
);

////
router.post(
  "/auth/register_admin",
  body("login").isLength({ min: 6, max: 30 }).trim(),
  body("password").isLength({ min: 8 }).trim(),
  body("passwordConfirm").isLength({ min: 8 }).trim(),
  body("email").isEmail().normalizeEmail().trim(),
  checkValid,
  auth.registerAdmin
);

//////

//auth login
router.post(
  "/auth/login",
  body("login").isLength({ min: 6, max: 30 }).trim(),
  body("password").not().isEmpty().trim(),
  auth.login
);

router.post("/auth/logout", auth.logout);

router.post(
  "/auth/password-reset",
  body("reset_password").not().isEmpty().trim(),
  body("reset_confirm_password").not().isEmpty().trim(),
  auth.passwordReset
);

//action with users, only admin

router.get("/users/:token", checkAdminAccess, userController.getUsers); //+
router.get("/users/:id/:token", checkAdminAccess, userController.getOneUser); //+

//+
router.post(
  "/users/:token",
  checkAdminAccess,
  body("login").isLength({ min: 6, max: 30 }).trim(),
  body("password").isLength({ min: 8 }).trim(),
  body("passwordConfirm").isLength({ min: 8 }).trim(),
  body("email").isEmail().normalizeEmail().trim(),
  body("role").not().isEmpty().trim(),
  userController.createUser
);

router.patch(
  "/users/:id/:token",
  checkAdminAccess,
  body("login").isLength({ min: 6, max: 30 }).trim(),
  body("password").isLength({ min: 8 }).trim(),
  body("email").isEmail().normalizeEmail().trim(),
  checkUpData,
  userController.updateUser
);
//post

//category only amin

//comment

//like

module.exports = router;
