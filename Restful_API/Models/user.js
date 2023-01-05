const mongoose = require("mongoose");
const joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
let usersSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userPassword: String,
  role: {
    type: String,
    default: "user",
  },
});

usersSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(this.userPassword, salt);
    this.userPassword = hashedpass;
    //  console.log(this.userPassword);
  } catch (error) {
    next(error);
  }
});
const users = mongoose.model("users", usersSchema);

function validateUserSignUp(data) {
  const Schema = joi.object({
    userName: joi.string().min(3).required(),
    userEmail: joi.string().email().required(),
    userPassword: joi.string().min(8).required(),
  });
  return Schema.validate(data, { abortEarly: false });
}

function validateUserLogin(data) {
  const Schema = joi.object({
    userEmail: joi.string().email().required(),
    userPassword: joi.string().min(8).required(),
  });
  return Schema.validate(data, { abortEarly: false });
}
module.exports.user = users;
module.exports.validateUserSignUp = validateUserSignUp;
module.exports.validateUserLogIn = validateUserLogin;
