const express = require("express");

const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const morgan = require("morgan");
const router = require("./router/router.js");

const PORT = 8080;

const app = express();

app.use(express.json()); /////
app.use(morgan("dev")); /////
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", router);


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
