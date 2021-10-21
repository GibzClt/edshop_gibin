const User = require('../models/user.model');

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