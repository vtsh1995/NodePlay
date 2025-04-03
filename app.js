const express = require('express')
const app = express();
const mainroutes = require('./router');
const path = require('path');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const url = 'mongodb+srv://vtsh1995:0q31LMFs8PWKXXlE@testcluster.yiu5h.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster'
const Mongoose = require('mongoose')
const mongoStore = require('connect-mongodb-session')(session);
const multer = require('multer')
const helmet = require('helmet')
const compression = require('compression')
const morgan= require('morgan')
const fs= require('fs');
const cluster = require('cluster')
const os= require('os')
require('./util/cache')

if(cluster.isMaster){
    console.log(`master process is runing ${process.pid}`)

    const workers = os.cpus().length;
    let i
    for (i=0 ;i <workers;i++){
        cluster.fork()
    }
    cluster.on('exit' , ()=>{
        console.log('worker died')
        cluster.fork()
    })
} else {
const store= new mongoStore({
    uri : url,
    collection: 'sessions'
})

const storage = multer.diskStorage({
    filename :(req, file ,cb)=> {
        cb(null, file.originalname)
    },
    destination: (req, file, cb)=>{
        cb(null,'public/images')
    }
})

const logService = fs.createWriteStream(path.join(__dirname, 'log.txt'))

app.use(helmet());
app.use(compression());
app.use(morgan('combined', {stream: logService}))
app.use((req,res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})
app.use(session({secret:'thisiscool', resave: false , saveUninitialized: false , store: store}))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(multer({ storage: storage}).single('imageFile'))
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use('/',mainroutes);

app.use((req,res)=>{
    res.status(404).send('Page not found')
});

    Mongoose.connect(url).then(()=>{
        console.log('mongodb connection established via mongoose')
        app.listen(2000)
    }).catch((err)=> console.log(err, 'server error'))

}


    