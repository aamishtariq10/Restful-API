var express = require("express");
var products = express.Router();
var { product } = require("../../Models/Products");
var validateProduct = require("../../Middleware/Validate");
var auth = require("../../Middleware/auth");
const admin = require("../../Middleware/admin");

//validate  c

/* GET home page. */
products.get("/", async function (req, res, next) {
  //console.log(req.User);
  let page = Number(req.query.page ? req.query.page : 1);
  let perpage = Number(req.query.perpage ? req.query.perpage : 20);
  skipRecords = perpage * (page - 1);
  let newproduct = await product.find().skip(skipRecords).limit(perpage);
  res.send(newproduct);
});
//page=2&perpage=3
products.get(
  "/:id",
  // auth,
  async function (req, res, next) {
    try {
      let newproduct = await product.findById(req.params.id);
      if (!product) return res.send("q");
      res.send(newproduct);
    } catch (err) {
      return res.send(err.message).status(404);
    }
  }
);
products.put(
  "/update/:id",
  // auth,
  // admin,
  validateProduct,
  async function (req, res, next) {
    let Cars = await product.findById(req.params.id);
    Cars.carCompany = req.body.carCompany;
    Cars.carName = req.body.carName;
    Cars.carModel = req.body.carModel;
    Cars.carPrice = req.body.carPrice;
    Cars.Features = req.body.Features;
    await Cars.save();
    res.send(Cars);
  }
);
products.delete(
  "/delete/:id",
  //auth, admin,
  async function (req, res, next) {
    let newproduct = await product.findByIdAndDelete(req.params.id);
    res.send(newproduct);
  }
);

products.post(
  "/create",
  // auth,
  // admin,
  validateProduct,
  async function (req, res, next) {
    let Cars = new product();
    Cars.carCompany = req.body.carCompany;
    Cars.carName = req.body.carName;
    Cars.carModel = req.body.carModel;
    Cars.carPrice = req.body.carPrice;
    Cars.Features = req.body.Features;
    await Cars.save();
    res.send(Cars);
  }
);
module.exports = products;
