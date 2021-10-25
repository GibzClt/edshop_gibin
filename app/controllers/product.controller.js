const Product = require("../models/").product;

const privateKey = "edshop";

const searchProducts =  (req, res) =>{
    res.status(200).json(res.results);
}

const getCategories = async (req, res)=>{
  try {
    const categories = await Product.find({});
    const categoryMap = new Map();
    categories.forEach(item => {
      if(!categoryMap.has(item.category)){
        categoryMap.set(item.category, 1);
      }
    });
    const categoryArr = Array.from(categoryMap.keys());
    console.log(categoryArr);
    res.status(200).json(categoryArr);
  } catch (err) {
    console.log(err);
    res.status(500).json({message : "Some error occured, please try again"});
  }
};

const getProductById = async (req, res)=>{
  const productId = parseInt(req.params.id);
  try {
    const product = await Product.findOne({productId});
    console.log(product);
    if(product){
      res.status(200).json(product);
    } else{
      res.status(404).json({message : `No Product found for ID - ${id}!` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({message : "Some error occured, please try again"});
  }
}

const jwt = require('jsonwebtoken');

const saveProduct = async (req, res)=>{
  const accessToken = req.header('x-auth-token');
  const user = jwt.verify(accessToken, privateKey);
  console.log(user);
  if(!accessToken){
    res.status(401).json({message : "Please Login first to access this endpoint!"});
    return;
  }
  if(user.role !== "admin"){
    res.status(403).json({message : "You are not authorized to access this endpoint!"});
    return;
  }
  try {
    const {name, availableItems, price, category, description,  imageUrl, manufacturer} = req.body;
    const productId = await Product.find({}).count() + 1;
    try{
      const product = new Product({
        productId : parseInt(productId),
        name,
        category,
        manufacturer,
        availableItems : parseInt(availableItems),
        price : parseFloat(price),
        imageUrl,
        description
      });
      const newProduct = await product.save();
      console.log(newProduct);
      res.status(201).json(newProduct);
    }catch(err){
      console.log(err);
      res.status(400).json({message : "Incomplete / Invalid entries"});
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({message : "Some error occured, please try again"});
  }
}

module.exports = {searchProducts, getCategories, getProductById, saveProduct};