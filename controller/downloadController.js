const fs = require('fs');
const path= require('path')

exports.downloadImage = async (req,res)=>{
    const filePath = path.join(__dirname,'../','public' ,'images', 'vela-hero-sample.jpeg');
    console.log(filePath ,"path")
    try{
        const readfile = await fs.createReadStream(filePath);
        readfile.pipe(res)
    }
    catch(err){
        console.log('error reading file', err)
    }
    
}