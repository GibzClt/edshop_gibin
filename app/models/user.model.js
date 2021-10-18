const validator = require('validator')
module.exports = (mongoose) =>{
  const User = mongoose.model('user', new mongoose.Schema({
    isAdmin : {
      type : Boolean,
      default : false
    },
    name : {
      type : String,
    },
    email : {
      type : String,
      required : true,
      validate : (value)=>validator.isEmail(value),
      unique : true
    },
    password : {
      type : String,
      required : true
    }
  },
  {timeStamps : true}
  ));
  return User;
};