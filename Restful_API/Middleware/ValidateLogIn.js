var {validateUserLogIn}= require('../Models/user');
function validateLogin(req, res ,next){
    let {error} = new validateUserLogIn(req.body);
    if (error)
    return res.status(404).send(error.details[0].message);
    next();
}
module.exports = validateLogin;