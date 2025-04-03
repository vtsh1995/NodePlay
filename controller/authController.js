const bcrypt = require('bcrypt')
const user = require('../model/user');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transport = nodemailer.createTransport(
    {   
        host: 'smtp.mailgun.org',
        port: 587,
        secure: false,
        auth:{
            user: 'postmaster@sandbox4c0e5c18cd5d4a51ab64499c213d5a22.mailgun.org',
            pass: 'bceaa81a83011d3b84cd4d8e052752c1-ac3d5f74-1af6051f'
}})

const mailContent = {
    from: 'brad@sandbox4c0e5c18cd5d4a51ab64499c213d5a22.mailgun.org',
    to: 'vtsh1995@gmail.com',
    subject: 'demo check',
    text: 'your now logged in'
}
const loginController =(req,res)=>{
    res.render('login', {title :'login'})
}

const postLoginController = async (req,res)=>{
    const {username, password} = req.body;
    const userRecord = await user.findOne({username: username});
    if(userRecord){
        const pwddecrypt = await bcrypt.compare(password , userRecord.password);
        if(pwddecrypt){
            const mailcheck = await transport.sendMail(mailContent);
            console.log(mailcheck ,"mychck")
            req.session.user = userRecord;
            req.session.isAuthenticated = true
            res.redirect('/')
        } else {
            console.log('pwd incorrect')
        }
    } else {
        console.log('you nust signup')
    }
    
    
}

const getresetPwd = (req,res) =>{ 
    res.render('getresetPassword' ,{title: 'Reset Password'})
}

const postResetPwd =async (req,res) => {
    const {forgotpwd} = req.body;
    const email = await user.findOne({username : forgotpwd});
    console.log(email , 'myemail')
    if(email){
        crypto.randomBytes(32 ,(err , buffer)=>{
          if(err){
            console.log('some errror on tokengen' , err);
          }
          const updatedToken = buffer.toString('hex');
          email.emailToken = updatedToken;
          email.emailTokenExpiry = Date.now() + 3600000;
          email.save();
          const loginMailContent ={
              from : 'brad@sandbox4c0e5c18cd5d4a51ab64499c213d5a22.mailgun.org',
              to: 'vtsh1995@gmail.com',
              subject: 'Password reset mail',
              html: `<div>Here is youar reset email. Click here to reset your password <a href="http://localhost:2000/resetpassword/${updatedToken}">Click here</a></div>` 
          }
              transport.sendMail(loginMailContent).then(()=>{
              res.redirect('/login')
          })
        })
    } else {
        console.log('no user found');
        res.redirect('/login')
    }
}

const getNewPassword = async (req,res)=>{
    const dbUser = await user.findOne({emailToken : req.params.token})
    if(dbUser.username){
        res.render('getNewPassword', {title: 'Set your own password' ,username: dbUser.username});
    } else {
        console.log('password expire')
        res.redirect('/login')
    }
  
}

const postNewPassword = async (req,res)=>{
    const {username} = req.body;
    console.log(req.body ,"token")
    const dbUser = await user.findOne({username : username});
    if(dbUser){
        const encryptPwd = await bcrypt.hash(req.body.newPassword, 10)
        dbUser.password = encryptPwd ;
        dbUser.emailToken = null;
        dbUser.emailTokenExpiry = null;
        dbUser.save();
        res.redirect('/login')
    }
}
exports.loginController = loginController
exports.postLoginController = postLoginController
exports.getResetPassword = getresetPwd
exports.postResetPassword = postResetPwd
exports.getNewPassword = getNewPassword
exports.postNewPassword = postNewPassword