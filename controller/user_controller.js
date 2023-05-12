const UserDb = require("../models/User.js");
const encrypt = require("../encrypt.js");
const userdb = new UserDb();

class UserController {
  async createUser(req, res, next) {
    try {
      console.log(req.body); /////////

      const userData = req.body;
      const encryptedPassw = encrypt(userData.password);
      const fields = {
        login: userData.login,
        password: encryptedPassw,
        email: userData.email,
        active: true,
        role: userData.role,
      };
      const crUser = await userdb.createUser(fields);
      res.json({ message: `User ${crUser.login} created` });
    } catch (error) {
      next(err);
    }
  }

  //+
  async getUsers(req, res) {
    const users = await userdb.getUsers();
    res.json(users);
  }

  //
  async getOneUser(req, res, next) {
    try {
      const id = req.params.id;
      const user = await userdb.getOneUser(id);
      if (user === null) {
        return next("Such user does not exist");
      }
      res.json({ ...user });
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res) {
    try {
      const userData = req.body;
      const { id } = req.params;
      const encryptedPassw = encrypt(userData.password);
      userData.password = encryptedPassw;
      const user = await userdb.updateUser(id, userData);
      res.json({ success: `User updated ${user.login}` });
    } catch (err) {
      console.log(err);
      res.end();
    }
  }

  async deleteUser(req, res) {
    const id = req.params.id;
    const user = await db.query("DELETE  FROM users where id = $1", [id]);
    res.json(user.rows[0]);
  }
}

module.exports = new UserController();

// class UserController {
//   async createUser(req, res) {
//     console.log(req.body); /////////
//     const { login, password, email } = req.body;
//     const newPerson = await db.query(
//       "INSERT INTO users (login, password, email) VALUES ($1, $2, $3) RETURNING *",
//       [login, password, email]
//     );
//     res.json(newPerson.rows[0]);
//   }

//   async getUsers(req, res) {
//     const users = await db.query("SELECT * FROM users");
//     res.json(users.rows);
//   }

//   async getOneUser(req, res) {
//     const id = req.params.id;
//     const user = await db.query("SELECT * FROM users where id = $1", [id]);
//     res.json(user.rows[0]);
//   }

//   async updateUser(req, res) {
//     const { id, full_name } = req.body;
//     const user = await db.query(
//       "UPDATE users set full_name = $1 where id = $2 RETURNING *",
//       [full_name, id]
//     );
//     res.json(user.rows[0]);
//   }

//   async deleteUser(req, res) {
//     const id = req.params.id;
//     const user = await db.query("DELETE  FROM users where id = $1", [id]);
//     res.json(user.rows[0]);
//   }
// }
