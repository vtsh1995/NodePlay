const Mongoose = require('mongoose');

const productSchema = Mongoose.Schema({ 
    message : {
        required: true,
        type: String
    }, code :{
        required: true,
        type: Number
    }, wishes :{
        required: true,
        type: String,
        index: true,
        unique: true
    },
    imageurl:{
        type: String,
        required: true,
    }    
})


module.exports = Mongoose.model('Product', productSchema)