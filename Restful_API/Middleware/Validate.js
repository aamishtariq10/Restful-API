var {validate}= require('../Models/Products');
function validateProduct(req, res ,next){
    let {error} = new validate(req.body);
    if (error)
    return res.status(404).send(error.details[0].message);
    next();



}
module.exports = validateProduct;