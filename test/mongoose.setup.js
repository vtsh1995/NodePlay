const mongoose = require('mongoose')

const {MongoMemoryServer} = require('mongodb-memory-server')


let tempServer
const connect =async()=>{
    tempServer = await  MongoMemoryServer.create()
    const uri = tempServer.getUri();
    await mongoose.connect(uri);
}

const close =async ()=>{
   await mongoose.disconnect()
    await tempServer.stop()
}


module.exports = {connect , close}