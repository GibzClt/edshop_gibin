module.exports = (mongoose)=>{
  const Product = mongoose.model('product', new mongoose.Schema({
    name : {
      type : String,
      required : true
    },
    category : {
      type : String,
      required : true
    },
    manufacturer : {
      type : String,
      required : true
    },
    availableItems : {
      type : Number,
      required : true
    },
    price : {
      type : Number,
      required : true
    },
    imageURL : {
      type : String,
      required : true
    },
    description : {
      type : String,
      required : true
    },
    updatedAt : {
      type : Date,
      max : (new Date).getDate()
    },
    createdAt : {
      type : Date,
      max : (new Date).getDate()
    }
  },
  {timeStamps : true}
  ));
  return Product;
};