const db = require("../db.js");
const TOKENS_TABLE = "token";
const { DataBaseError, errors } = require("../utils/error.util.js");

module.exports = class dbToken {
  async getToken(user_id) {
    try {
      const token = await db(TOKENS_TABLE).select("*").where({
        "token.userid": user_id,
      });

      if (!token[0]) {
        return null;
      }

      return token[0];
    } catch (err) {
      throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
    }
  }

  async deleteToken(id) {
    try {
      const res = await db(TOKENS_TABLE)
        .del()
        .where({
          id,
        })
        .returning("id");

      if (!res[0]) {
        throw new DataBaseError(errors.get(DATA_BASE_ERROR));
      }
    } catch (err) {
      throw err;
    }
  }

  async addToken(fields) {
    try {
      const res = await db(TOKENS_TABLE).insert(fields).returning("*");

      return res;
    } catch (err) {
      throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
    }
  }

  async updateToken(id, fields) {
    try {
      const res = await db(TOKENS_TABLE)
        .where({ id })
        .update(fields)
        .returning("*");

      if (!res[0].id) {
        throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
      }

      return res[0];
    } catch (err) {
      console.error(err);
      throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
    }
  }
};
