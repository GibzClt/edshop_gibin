const Product = require("../controllers/product.controller");
const ProductMW = require("../middleware/product.middleware");

module.exports = (app)=>{
  const router = require('express').Router();
  app.use('/api', router);
  router.get('/products', ProductMW.pagination, Product.searchProducts);
  router.get('/products/categories', Product.getCategories);
  router.get('/products/:id', Product.getProductById);
  router.post('/products', Product.saveProduct);
}