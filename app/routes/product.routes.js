const Product = require("../controllers/product.controller");
const ProductMW = require("../middleware/product.middleware");

module.exports = (app)=>{
  const router = require('express').Router();
  app.use('/api', router);
  router.get('/products', ProductMW.pagination, Product.searchProducts);
  router.get('/products/categories', Product.getCategories);
}