const ProductModel = require('../model/productModel')

exports.homeController= async (req,res)=>{
    const entryPerPage = 2
    const pageNo = req.query.page;
    const results =await ProductModel.find().skip((pageNo -1)* entryPerPage).limit(entryPerPage)
        res.render('home' , {title: results , isAuthenticated : req.session.isAuthenticated }) 
}