var {validateUserSignUp}= require('../Models/user');
function validateSignUp(req, res ,next){
    let {error} = new validateUserSignUp(req.body);
    if (error)
    return res.status(404).send(error.details[0].message);
    next();
}
module.exports = validateSignUp;