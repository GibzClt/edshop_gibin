const jwt = require('jsonwebtoken');
const privateKey = 'edshop';

const authenticate = (req, res, next) => {
  const accessToken = req.header('x-auth-token');
  const user = jwt.verify(accessToken, privateKey);
  console.log(user);
  if(!accessToken){
    res.status(401).json({message : "Please Login first to access this endpoint!"});
    return;
  }
  req.user = user;
  next();
}

const authorize = (req, res, next) =>{
  const {user} = req;
  if(user.role !== "admin"){
    res.status(403).json({message : "You are not authorized to access this endpoint!"});
    return;
  }
  next();
}

module.exports = {authenticate, authorize};