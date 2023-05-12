const User = require("../models/User.js");
const Token = require("../service/tokens.js");

const user = new User();
const tokenMng = new Token();

module.exports = async (req, res, next) => {
  const token = req.params.token;
  console.log("token: ", token);

  if (!token || tokenMng.validateAccessToken(token) === null) {
    return next("unauthorized");
  }
  const { id } = tokenMng.validateAccessToken(token);
  // if (id === -1) next({ message: "unauthorized" });
  console.log("id = ", id);
  // console.log("role = ", role);

  const userToken = await user.getVal(id, "token");
  const userRole = await user.getVal(id, "role");
  console.log("role = ", userRole);
  // console.log("userToken: ", userToken.token);

  if (userToken.token !== token || userRole.role !== "admin") {
    next("PERMISSION DENIED");
  }

  next();
};
