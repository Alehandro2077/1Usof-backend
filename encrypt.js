const crypto = require("crypto");

module.exports = (text) => {
  try {
    const hash = crypto.createHmac("sha256", "ban");
    hash.update(text);
    return hash.digest("hex");
  } catch (err) {
    throw err;
  }
};
