const exp=require("express")
const app=exp();
const mc=require('mongodb').MongoClient
const path=require("path")
app.use(exp.static(path.join(__dirname,'./dist/PROJECT')))
require("dotenv").config()
const url=process.env.DATABASE_URL
let dbObj;
mc.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err)
        console.log("error in connecting to db ",err)
    else{
        dbObj=client.db("theatroflex")
        let usersCollectionObj=dbObj.collection('userscollection')
        let adminCollectionObj=dbObj.collection('admincollection')
        let tollywoodCollectionObj=dbObj.collection('tollywoodcollection')
        let bollywoodCollectionObj=dbObj.collection('bollywoodcollection')
        let hollywoodCollectionObj=dbObj.collection('hollywoodcollection')
        let userWatchlaterCollectionObj=dbObj.collection('userwatchlatercollection')
        app.set('usersCollectionObj',usersCollectionObj)
        app.set('adminCollectionObj',adminCollectionObj)
        app.set('tollywoodCollectionObj',tollywoodCollectionObj)
        app.set('hollywoodCollectionObj',hollywoodCollectionObj)
        app.set('bollywoodCollectionObj',bollywoodCollectionObj)
        app.set('userWatchlaterCollectionObj',userWatchlaterCollectionObj)
        console.log("connected to db...")
    }
})
const userApi=require('./APIs/user')
const adminApi=require('./APIs/admin')
const tollywoodApi=require('./APIs/tollywood')
const bollywoodApi=require('./APIs/bollywood')
const hollywoodApi=require('./APIs/hollywood')
app.use('/user',userApi)
app.use('/admin',adminApi)
app.use('/tollywood',tollywoodApi)
app.use('/bollywood',bollywoodApi)
app.use('/hollywood',hollywoodApi)
app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is invalid`})
})
app.use((err,req,res,next)=>{
    res.send({message:`error is ${err.message}`})
})
const port=process.env.PORT||9000
app.listen(port,()=>{
    console.log(`listening to ${port}...`)
})
