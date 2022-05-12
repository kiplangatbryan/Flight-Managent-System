const express = require("express");
const colors = require("colors");
const logger = require("morgan");
const cors = require("cors");


// user imports
const routes = require("./router");
// const { alertMonitor, graphMonitor } = require("./workers/main");
const { MainError } = require("./helpers");
const { db } = require("../configs/db");
require("dotenv").config({ path: "../configs" });

const app = express();
const PORT = process.env.PORT || 5080;

// settings
app.use(logger("dev"));
app.use(cors())
// app.use(express.json());

colors.setTheme({
  silly: "rainbow",
  input: "grey",
  verbose: "cyan",
  prompt: "grey",
  info: "green",
  data: "grey",
  help: "cyan",
  warn: "yellow",
  debug: "blue",
  error: "red",
});
app.use(express.urlencoded({ extended: false }));

// daemons

// app routes
app.use(routes);

// default Error Handler
app.use(MainError);

// catch all errors
app.use("*", (req, res) => {
  return res.status(404).json({
    error: "route not found",
  });
});

db();

app.listen(PORT, () => {
  console.log(`[001] airline server running ${PORT}`.yellow);
});
