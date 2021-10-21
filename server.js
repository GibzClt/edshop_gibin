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

require('./app/routes/user.routes')(app);

app.listen(PORT, ()=>console.log(`Server has started at port ${PORT}`));