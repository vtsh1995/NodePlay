const express = require('express');
const router = express.Router();
const addprodController = require('./controller/addproduct')
const homeController = require('./controller/home');
const homeSubmitController = require('./controller/homeSubmit')
const downloadController = require('./controller/downloadController')
const authController = require('./controller/authController')
const productModel = require('./model/productModel')
const signupController = require('./controller/signupController')
const feedController = require('./controller/feedController')
const {body} = require('express-validator')
const newSignupController = require('./controller/newSignupController')
const newloginController = require('./controller/newLoginController')
const deleteController = require('./controller/deleteController')
const checkController= require('./controller/checkController')
const {isAuth} = require('./middleware/auth')

router.get('/add-products', addprodController.addproductController);

router.post('/submit',(req,res)=>{
    const {message , code , wishes  }=req.body;
    const imageFile = req.file;
    const newProduct = new productModel({message: message , code: code , wishes:wishes , imageurl: imageFile.path })
    newProduct.save().then((response)=>{
       res.redirect('/')
    })
})

router.get('/product/:prodid', homeSubmitController.homeSubmitController);

router.get('/login', authController.loginController )

router.post('/login',  authController.postLoginController)

router.get('/signup', signupController.getSignUpController)

router.post('/signup', signupController.postSignupController)

router.get('/resetpassword' , authController.getResetPassword)

router.post('/resetpassword' , authController.postResetPassword)

router.get('/resetPassword/:token' , authController.getNewPassword)

router.post('/setNewPassword' , authController.postNewPassword)

router.get('/download' , downloadController.downloadImage)

router.get('/fetch-post' ,feedController.getFeed)

router.post('/add-post', feedController.postfeed)

router.post('/newsignup', newSignupController.signup)

router.post('/newlogin', [body('email').isEmail()] , newloginController.newLogin)

router.delete('/resource', deleteController.deleteResource)

router.get('/check' , checkController.check)

router.get('/' , homeController.homeController);



module.exports= router;