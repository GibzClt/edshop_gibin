const Product = require("../models/").product;

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

module.exports = {searchProducts, getCategories};