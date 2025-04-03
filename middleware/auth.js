const jwt = require('jsonwebtoken')
exports.isAuth =(req, res, next)=>{
    try{
        const token = req.header('Authorization');
        console.log(token, "token")
        const fetchData = jwt.verify(token , "mysecretkey");
        console.log(fetchData, "token2")
        next()

    } catch(err){
        const error = new Error('validation failed');
        error.status= 500;
        throw error
    }
    
}