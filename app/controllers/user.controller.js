const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const privateKey = "edshop";

const signup = async (req, res) => {
  try {
    const {firstName, lastName, email, contactNumber, password};
    const emailInDb = await User.find({email});
    if(emailInDb){
      res.status(400).json({message : "Try any other email, this email is already registered!"});
      return;
    }
    let emailRegex = /^[a-zA-Z0-9._-]{1,}@[a-zA-Z0-9._-]{1,}.[a-z]{2,6}$/;
    if(!emailRegex.test(emailInDb)){
      res.status(400).json({message : "Invalid email address"});
      return;
    }
    let contactRegex = /^(+91)?\d{10}$/;
    if(!contactRegex.test(contactNumber)){
      res.status(400).json({message : "Invalid contact number!"});
      return;
    }
    const user = new User({
      firstName,
      lastName,
      username : `${firstName}_${lastName}`,
      email,
      contactNumber,
      password,
      createdAt : (new Date()).toISOString()
    });
    const newUser = await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({message : "Some error has occured. Please try again"});
  }
}

const login = async (req, res) =>{
  try {
    const {email, password} = req.body;
    if(!email || ! password){
      res.status(400).json({message : "Empty fields"});
      return;
    }
    const userInDb = await User.find({email});
    if(!userInDb){
      res.status(401).json({message : "This email has not been registered!"});
      return;
    }
    if(password !== userInDb.password){
      res.status(401).json({message : "Invalid Credentials!"});
      return;
    }
    const accesstoken = jwt.sign({
      username : userInDb.username,
      role : userInDb.role,
      time : Date.now()
    },
    privateKey
    );
    res.set('x-auth-token', accesstoken);
    res.status(200).json({
      email : userInDb.email,
      name : `${userInDb.firstName} ${userInDb.lastName}`,
      isAuthenticated : true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({message : "Some error has occured, please try again"});
  }
}