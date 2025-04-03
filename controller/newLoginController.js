const bcrypt = require('bcrypt');
const userModal= require('../model/newUser')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer')

exports.newLogin =async (req,res)=>{

    const {email, password}= req.body;
    const [userRecord] = await userModal.find({email: email});
   const check =await userModal.aggregate([
    { $group : {
        _id: "$name", count :{$sum: 1}
    },  }, {
        $sort : {
            "_id" : -1
        }
    }, {
        $limit: 2
    }
   ])
   console.log(check , "verify")

    if(!userRecord){
        res.status(404).json({message: 'user not found please signup'})
    } else {
        const checkpwdMatch =await bcrypt.compare(password, userRecord.password);
        if(checkpwdMatch){
            const token=  jwt.sign({
                email : userRecord.email,
                name: userRecord.name
            }, "mysecretkey", {expiresIn: 3600})
            res.status(200).json({token :token , userId: userRecord._id});
        }

    }

}