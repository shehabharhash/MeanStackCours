const express=require('express');
const bodyparser=require('body-parser');
const CORS=require('cors');
const Mongoose=require('mongoose');
const Path =require('path');
const passport =require('passport');
const users=require('./Routes/users')
const Config=require('./Config/config');
const app=express();
const Port=3000;
//Connev=ct to DB from Configfile Connection String
Mongoose.connect(Config.DB,{ useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });
//Check DB is Connected
Mongoose.connection.on('connected',()=>{
console.log('Connected To Db'+Config.DB)
})

//Check DB thow an error
Mongoose.connection.on('error',(err)=>{
    console.log('failed with error'+err)
    })
// to allow access rom another domain
app.use(CORS());
//to connect to clientside
app.use(express.static(Path.join(__dirname,'Public')))

app.use(bodyparser.json());
app.use(passport.initialize());
app.use(passport.session());
require("./Config/passport")(passport)
app.use('/user',users);

app.listen(Port,()=>{ console.log(`server is up at`+Port)})

app.get('/',(req,res)=>{
    res.send('hello form default app')
});

app.get('*',(req,res)=>{
    res.sendFile(Path.join(__dirname,"Public/Index.html"))
});

