const postmodel = require('../model/postmodel')
const jwt = require('jsonwebtoken')

exports.getFeed =async (req,res)=>{
    console.log("hello")
    const fetchData= await postmodel.find().cache().exec()
    console.log("query executed");

    res.status(200).json({
        posts: fetchData
    })
}

exports.postfeed =async (req,res)=>{
    try{
        const {title, content, creator, imageUrl }= req.body; 
        console.log(req.body, "my body")
        const addData = new postmodel({title: title, imageUrl: imageUrl ,content: content, creator: creator});
        const saveData= await addData.save();
        res.status(201).json({message: "inserted succesffully"})
    }
    catch(err){
        console.log(err, "error found")
    }
}