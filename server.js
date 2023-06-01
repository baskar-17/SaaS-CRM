const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const router = require("./routes");
const Users = require("./model/Users");
const Callback = require("./model/Callbacks");

mongoose
  .connect(
    "mongodb+srv://baskars:Baskar1997@cluster0.okkvo6e.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongoDB connected");
  });

app.use("/", router);
app.use("/requestcallback", router);
app.use("/admincallbacks", router);
app.use("/updatecallbacks", router);
app.use("/login", router);
app.use("*", router);

app.listen(3000, () => {
  console.log("server is running");
});
