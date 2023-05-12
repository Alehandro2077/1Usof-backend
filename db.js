const knex = require("knex");

const cli = knex({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "<your user>",
    password: "<your password>",
    database: "usof_backend",
  },
  searchPath: ["knex", "public"],
});

module.exports = cli;
