const Product = require('../model/productModel')

exports.homeSubmitController=  async (req,res) =>{
    const id = req.params.prodid;
    const findProduct = await Product.findById(id)
        res.render('details' , {title: 'details' , data: findProduct});
    
}  