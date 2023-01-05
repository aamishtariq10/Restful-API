var express = require("express");
var router = express.Router();
var { user } = require("../../Models/user");
var validateSignUp = require("../../Middleware/ValidateSignUp");
var validateLogIn = require("../../Middleware/ValidateLogIn");
var jwt = require("jsonwebtoken");
var config = require("config");

var bcrypt = require("bcryptjs");
var _ = require("lodash");
/* GET users listing. */

router.get("/", async function (req, res, next) {
  let users = await user.find();
  res.send(users);
});

router.post("/register", validateSignUp, async function (req, res, next) {
  let newuser = await user.findOne({ userEmail: req.body.userEmail });
  if (newuser)
    return res.status(404).send(`${req.body.userEmail} user already exists`);
  newuser = new user();
  newuser.userName = req.body.userName;
  newuser.userEmail = req.body.userEmail;
  newuser.userPassword = req.body.userPassword;
  // let salt = await bcrypt.genSalt(10)
  // newuser.userPassword = await bcrypt.hash(newuser.userPassword, salt);

  await newuser.save();
  res.send(_.pick(newuser, ["userName", "userEmail"]));
});

router.post("/login", validateLogIn, async function (req, res, next) {
  let User = await user.findOne({ userEmail: req.body.userEmail });
  if (!User)
    return res.status(404).send(`${req.body.userEmail} user does not exists`);
  let isValid = await bcrypt.compare(req.body.userPassword, User.userPassword);
  if (!isValid) return res.status(401).send("invalid pass");
  let token = jwt.sign(
    { _id: User._id, userName: User.userName },

    config.get("jwtPrivateKey")
  );

  res.send(token);
  // res.send (`hey, ${User.userName}, Welcome to our page`)
});
module.exports = router;
