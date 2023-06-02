const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const mongodbSession = require("connect-mongodb-session")(session);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const store = new mongodbSession({
  uri: "mongodb+srv://baskars:Baskar1997@cluster0.okkvo6e.mongodb.net/?retryWrites=true&w=majority",
  collection: "sessions",
});

app.use(
  session({
    secret: "this is a secret project",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

mongoose
  .connect(
    "mongodb+srv://baskars:Baskar1997@cluster0.okkvo6e.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongoDB connected");
  });

const router = require("./routes");
const Users = require("./model/Users");
const Callback = require("./model/Callbacks");

app.use("/", router);
app.use("/requestcallbacks", router);
app.use("/admincallbacks", router);
app.use("/updatecallbacks", router);
app.use("/storeupdatecallbacks", router);
app.use("/login", router);
app.use("/register", router);
app.use("/createuser", router);
app.use("/auth", router);
app.use("*", router);

app.listen(3000, () => {
  console.log("server is running");
});
