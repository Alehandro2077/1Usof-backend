const db = require("../db.js");
const USERS_TABLE = "users";
const { DataBaseError, errors } = require("../utils/error.util");

module.exports = class User {
  async createUser(fields) {
    try {
      const user = await db(USERS_TABLE).insert(fields).returning("*");

      if (!user[0]) {
        return null;
      }

      return user[0];
    } catch (err) {
      throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
    }
  }

  //+
  async getUsers() {
    try {
      const users = await db(USERS_TABLE).select(
        "id",
        "login",
        "full_name",
        "email",
        "profile_pic",
        "rating"
      );
      return users;
    } catch (err) {
      throw err;
    }
  }

  //+
  async getOneUser(id) {
    try {
      const user = await db(USERS_TABLE)
        .select("id", "login", "full_name", "email", "profile_pic", "rating")
        .where({ id });
      if (!user[0]) {
        return null;
      }

      return user[0];
    } catch (err) {
      throw err;
    }
  }

  async getUserData(column, value) {
    try {
      const res = await db(USERS_TABLE).select("*").where(column, "=", value);

      if (res.length === 0) {
        console.log(column, value);
        console.log("user does not exist");
        return null;
      }
      return res[0];
    } catch (err) {
      throw err;
    }
  }

  async updateUser(id, fields) {
    try {
      const user = await db(USERS_TABLE).where({ id }).update(fields).returning("login");
      return user[0];
    } catch (err) {
      throw err;
    }
  }

  async saveToken(token, login) {
    await db(USERS_TABLE).where("login", "=", login).update("token", token);
  }

  async getVal(id, column) {
    const data = await db(USERS_TABLE).select(column).where({ id });
    return { ...data[0] };
  }

  async deleteUser(id) {
    try {
      const res = await db(USERS_TABLE).del().where({ id }).returning("id");

      if (!res[0]) {
        throw new DataBaseError(errors.get(DATA_BASE_ERROR));
      }
    } catch (err) {
      throw err;
    }
  }

  async isEmailExist(email) {
    try {
      const data = await db(USERS_TABLE)
        .select({ email: "email" })
        .where("email", "=", email);

      return data.length !== 0;
    } catch (err) {
      throw err;
    }
  }

  async isLoginExist(login) { 
    try {
      const data = await db(USERS_TABLE)
        .select({ name: "login" })
        .where("login", "=", login);

      return data.length !== 0;
    } catch (err) {
      throw err;
    }
  }

  async logout(id) {
    try {
      await db(USERS_TABLE).where({ id }).update("token", null);
    } catch (err) {
      throw err;
    }
  }

  async resetPassw(id, column, value) {
    try {
      await db(USERS_TABLE).where({ id }).update(column, value);
    } catch (err) {
      throw err;
    }
  }
};
