
const searchProducts =  (req, res) =>{
  try {
    const {category, direction, name, sortBy} = req.query;
    console.log("category ", category);
    console.log("direction ", direction);
    console.log("name ", name);
    console.log("sortBy ", sortBy);
    res.status(200).json(res.results);
  } catch (err) {
    console.log(err);
    res.status(500).json({message : "Some error has occured, please try again"});
  }
}

module.exports = {searchProducts};