const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const Callbacks = require("./model/Callbacks");
const Users = require("./model/Users");
const router = express.Router();
const bcrypt = require("bcrypt");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/requestcallbacks", (req, res) => {
  const { name, email, phone } = req.body;
  const callback = new Callbacks({
    name: name,
    email: email,
    phone: phone,
    date: new Date(),
  });
  callback.save();
  res.redirect("/");
});

router.get("/admincallbacks", async (req, res) => {
  const admincallbacks = await Callbacks.find().sort({ date: "desc" });
  res.render("./admin/admincallbacks", { admincallbacks: admincallbacks });
});

router.post("/updatecallbacks", async (req, res) => {
  let admincallbacks = await Callbacks.findOne({
    _id: new ObjectId(req.body.id),
  });
  res.render("./admin/updatecallbacks", { admincallbacks: admincallbacks });
});

router.post("/storeupdatecallbacks", async (req, res) => {
  let data = await Callbacks.updateOne(
    { _id: new ObjectId(req.body.id) },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        status: req.body.status,
        notes: req.body.notes,
      },
    }
  );

  res.redirect("/admincallbacks");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      req.session.isAuth = true;
      req.session.user = true;
      if (user.role == 0) {
        res.render("dashboard");
      } else {
        res.render("admin/admindashboard");
      }
    } else {
      return res.status(406).json({ message: "Password Incorrect" });
    }
  } else {
    return res.status(406).json({ message: "User does not exist" });
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/createuser", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    return res.status(406).json({ message: "user already exist" });
  } else {
    const user = new Users({
      name: name,
      email: email,
      password: await bcrypt.hash(password, 12),
    });
    await user.save();
    res.redirect("/login");
  }
});

router.get("*", (req, res) => {
  res.render("notFound");
});

module.exports = router;
