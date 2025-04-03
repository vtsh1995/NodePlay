
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postmodel = new Schema({
    title: {
        type: String,
        required: true
    }, 
    imageUrl:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: false,
    },
    creator:{
        type: Object,
        required: true
    },
},{timestamps:true}
)

module.exports = mongoose.model('postModel', postmodel)


