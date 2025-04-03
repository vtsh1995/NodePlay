const mongoose = require('mongoose');
const schema = mongoose.Schema;

const newUser = new schema({
    email : {
        type: String,
        required: true
    },
    password: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('newuser', newUser)