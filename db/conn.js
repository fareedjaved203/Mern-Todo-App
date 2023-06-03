const mongoose = require("mongoose");

const DB =
  "mongodb+srv://fareedjaved203:9U6SaqlibdkUssVV@cluster0.vj7htrg.mongodb.net/Cowlar_TodoList?retryWrites=true&w=majority";
mongoose
  .connect(DB)
  .then(() => {
    console.log("Database Connection Successful");
  })
  .catch((err) => {
    console.log("Database Connection Failed");
  });
