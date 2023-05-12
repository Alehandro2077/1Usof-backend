const jwt = require("jsonwebtoken");

const JWT_SECRET = "nqwjfg-213k123n41";

class Token {
  getAccessToken(data) {
    console.log("secret key: ", JWT_SECRET);
    const refreshToken = jwt.sign(data, JWT_SECRET, {
      expiresIn: "20m",
    });
    return refreshToken;
  }

  // getAccessToken(data) {
  //   const accessToken = jwt.sign(data, JWT_SECRET, {
  //     expiresIn: "10m",
  //   });
  //   return accessToken;
  // }

  validateAccessToken(token) {
    try {
      const data = jwt.verify(token, JWT_SECRET);
      return data;
    } catch (err) {
      return null;
    }
  }
}

module.exports = Token;
