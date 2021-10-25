
const searchProducts =  (req, res) =>{
    res.status(200).json(res.results);
}

module.exports = {searchProducts};