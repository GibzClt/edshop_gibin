module.exports = (mongoose)=>{
  const Product = mongoose.model('product', new mongoose.Schema({
    productId : {
      type : Number,
      required : true
    },
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
    }
  },
  {timeStamps : true}
  ));
  return Product;
};