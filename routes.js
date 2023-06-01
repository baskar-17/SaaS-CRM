const express = require("express");
const ObjectId = require("mongoose").ObjectId;
const Callbacks = require("./model/Callbacks");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//Users
router.get("/", (req, res) => {
  res.render("index");
});

router.post("/requestcallback", (req, res) => {
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

router.post("/updatecallbacks", (req, res) => {
  let admincallbacks = Callbacks.findOne({ _id: ObjectId(req.body.id) });
  console.log(admincallbacks);
  // res.redirect("/updatecallbacks");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("*", (req, res) => {
  res.render("notFound");
});

//Admin
module.exports = router;
