const  mongoose = require('mongoose');
const redis= require('redis');
const client = redis.createClient();
client.connect().then(()=> {console.log('redis good')})

mongoose.Query.prototype.cache = function(options ={}) {
    this.setCache = true;
    this.setParentKey = options.key || ""
    return this
}

const exec = mongoose.Query.prototype.exec ;

mongoose.Query.prototype.exec = async function(){
   
    if(this.setCache){
        const key = JSON.stringify( Object.assign({},this.getQuery(), {collection : this.mongooseCollection.name}))
        //search for key if yes return from cache
        const cachedData = await client.hGet(this.setParentKey, key)
        if(cachedData){
            console.log(cachedData ,"cached dataa here")
            const transformedData= JSON.parse(cachedData)
             return new this.model(transformedData)
        }
        //if no key reteieve from db and store in redis
        const dbResults = await exec.apply(this, arguments)
        await client.hSet(this.setParentKey ,key, JSON.stringify(dbResults))
        await client.expire(this.setParentKey , 10)
        return dbResults
    }
    return exec.apply(this,arguments)
    
}


