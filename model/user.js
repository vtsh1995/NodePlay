const mongoose = require('mongoose')

const userSchema = mongoose.Schema({ username :{
    require: true,
    type : String
    },
    password:{
    type: String,
    required: true
    },
    emailToken: {
        type : String
    },
    emailTokenExpiry : {
        type: Date
    }
})

module.exports =  mongoose.model('User', userSchema)