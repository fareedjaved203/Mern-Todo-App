const mongoose = require("mongoose");
require("dotenv").config();
const dbPassword = process.env.DB_PASSWORD;

const DB = dbPassword;
mongoose
  .connect(DB)
  .then(() => {
    console.log("Database Connection Successful");
  })
  .catch((err) => {
    console.log("Database Connection Failed");
  });
