const Product = require('../models/').product;

const pagination = async (req, res, next)=>{
    let {pageNo, pageSize} = req.query;
    pageNo = parseInt(pageNo);
    pageSize = parseInt(pageSize);
    const start = pageNo * pageSize;
    const end = (pageNo+1) * pageSize;
  
    const results = {};
    if(start > 0){
      results.previous = {
        page : pageNo - 1,
        pageSize
      }
    }
    if(end < await Product.find({}).count()){
      results.next = {
        page : pageNo + 1,
        pageSize
      }
    }
    console.log("start : ", start, " end : ", end);
    const products = await Product.find({}).limit(pageSize).skip(start);
    results.content = products;
    res.results = results;
    next();
  };


module.exports = {pagination};