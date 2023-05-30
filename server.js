const express = require("express");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("server is running");
});
