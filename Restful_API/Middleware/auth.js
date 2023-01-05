var jwt = require("jsonwebtoken"); 
var {user} = require("../Models//user")
var config = require("config");
async function  auth(req, res, next)
{
     try{
    let token  =  req.header("x-auth-token");
    if(!token) return res.status(401).send("invalid provided token");
    let User = jwt.verify( token , config.get("jwtPrivateKey") );
    
    req.User = await user.findById(User._id);
    next();
        }
   catch (error) {
        return res.status(403).send("invalid token"); 
       
    }
  
}
module.exports = auth;