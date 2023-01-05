function admin(req , res ,next) {
    if (req.User.role!= "admin")
     return res.status(403).send("not autherized");
    next();
}   
module.exports = admin;