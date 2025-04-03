const user = require('../model/user')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const {validationResult} = require('express-validator')


const getSignUpController =(req,res)=>{
    res.render('signup', {title: 'signup', validationErrorMsg: null,validationError: null})
}

const postSignupController =async (req,res)=>{
    const {username , password} = req.body;
    const results = validationResult(req);

    console.log(results,"errors")
    console.log(results.isEmpty(),"CHECLK")
    if(!results.isEmpty()){
        console.log(results.isEmpty())
        res.status(422).render('signup', {title: 'signup', validationErrorMsg: results.errors[0].msg,validationError: results.errors})
    } else {
        const getUsername = await user.findOne({username:username})

        if(getUsername){
            res.redirect('/login')
        }else {
            try {
                const salt = 10
                console.log(password , "mypass" ,typeof(password))
                const encryptedPwd = await bcrypt.hash(String(password),salt);
                const createUser = new user({username: username , password : encryptedPwd});
                await createUser.save();
                res.redirect('/')
            }
            catch(err){
                console.log(err ,"my headache")
            }
        }
    }
}

exports.getSignUpController = getSignUpController;
exports.postSignupController= postSignupController;