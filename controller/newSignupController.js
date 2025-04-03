const Newuser = require('../model/newUser')
const bcrypt = require('bcrypt')

exports.signup= async (req,res)=>{
    const {email , password, name}= req.body;
    try {
        const encryptPassword = await bcrypt.hash(password , 12);
        const newUser = await new Newuser({email : email, password: encryptPassword , name: name});
         newUser.save();
         res.status(200).json({message : "data inserted sucessfully"})
    } catch(err) {
        const error = new Error("something wrong with data insetion")
        error.status =500
        throw error
    }
    
}

