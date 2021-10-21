const PORT = 8000;

const db = require('./app/models/');
const main = (async ()=>{
  try{
    await db.mongoose.connect(db.url,{
      useNewUrlParser : true,
      useUnifiedTopology : true
    });
    console.log("Connected to the database");
  } catch(err){
    console.log("Cannot cannot to the database ! \n", err);
    process.exit();
  }
})();

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended : true}));

app.listen(PORT, ()=>console.log(`Server has started at port ${PORT}`));

app.get("/", async(req, res)=>{
  try {
    const orders = await db.order.find({});
    const product = await db.product.find({});
    const users = await db.user.find({});
    const address = await db.address.find({});
    res.json({orders, product, users, address});
  } catch (error) {
    console.log(err);
    console.log("error");
    res.sendStatus(400);
  }
})