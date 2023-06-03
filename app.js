const express = require("express");
const app = express();

require("./db/conn"); //importing db connection from db folder
require("./model/todoSchema"); //defined schema
app.use(express.json()); //a middleware to convert json data into js object, usually when posting data through postman
app.use(require("./router/auth")); //to link router file

app.listen(8000);
