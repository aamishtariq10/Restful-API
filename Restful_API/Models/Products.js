const mongoose = require("mongoose");
const joi = require("@hapi/joi");
let carSchema = new mongoose.Schema({
  carCompany: String,
  carName: String,
  carModel: Number,
  carPrice: Number,
  Features: [String],
});
const Cars = mongoose.model("Cars", carSchema);

function validateProduct(data) {
  const Schema = joi.object({
    carCompany: joi.string().min(3).max(20).required(),
    carName: joi.string().min(3).max(20).required(),
    carModel: joi.number().min(1000).required(),
    carPrice: joi.number().min(0).required(),
    Features: joi.any(),
  });
  return Schema.validate(data, { abortEarly: false });
}

module.exports.product = Cars;
module.exports.validate = validateProduct;
