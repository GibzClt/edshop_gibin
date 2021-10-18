module.exports = (mongoose)=>{
  const Order = mongoose.model('order', new mongoose.Schema({
    address : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Addresse",
      required : true
    },
    product : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Product",
      required : true
    },
    quantity : {
      type : Number,
      required : true
    },
    user : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User",
      required : true
    }
  },
  {timeStamps : true}
  ));
  return Order;
}