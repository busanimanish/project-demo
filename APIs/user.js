const exp=require("express")
const userApi=exp.Router();
const expressErrorHandler=require("express-async-handler")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
userApi.use(exp.json())

userApi.post('/register',expressErrorHandler(async(req,res,next)=>{
    let usersCollectionObj=req.app.get("usersCollectionObj")
    let newUserObj=req.body
    let user=await usersCollectionObj.findOne({username:newUserObj.username})
    if(user===null){
        newUserObj.password=await bcryptjs.hash(newUserObj.password,7)
        await usersCollectionObj.insertOne(newUserObj)
        res.send({message:'User registered'})
    }
    else{
        res.send({message:'User already exists'})
    }
}))

userApi.post('/login',expressErrorHandler(async(req,res,next)=>{
    let usersCollectionObj=req.app.get("usersCollectionObj")
    let userLoginObj=req.body
    let user=await usersCollectionObj.findOne({username:userLoginObj.username})
    if (user===null){
        res.send({message:'Invalid username'})
    }
    else{
        let pw=bcryptjs.compare(userLoginObj.password,user.password)
        if(pw===false){
            res.send({message:'Invalid password'})
        }
        else{
            let token=jwt.sign({username:userLoginObj.username},process.env.SECRET,{expiresIn:"24h"})
            res.send({message:"Login success",token:token,username:user.username,userObj:userLoginObj})
        }
    }
}))

userApi.post('/watchlater',expressErrorHandler(async(req,res,next)=>{
    let watchlaterObj=req.body
    let userWatchlaterCollectionObj=req.app.get('userWatchlaterCollectionObj')
    let watchlaterMoviesObj=await userWatchlaterCollectionObj.findOne({username:watchlaterObj.username})
    if (watchlaterMoviesObj==null){
        let movies=[]
        movies.push(watchlaterObj.movieObj)
        let userWatchlaterObj={username:watchlaterObj.username,movies}
        await userWatchlaterCollectionObj.insertOne(userWatchlaterObj)
        res.send({message:"Movie added to watchlater"})
    }
    else{
        let movieAlreadyPresent=(watchlaterMoviesObj.movies).filter(movieObj=>movieObj.title===watchlaterObj.movieObj.title)
        if (movieAlreadyPresent.length!=0){
            res.send({message:'Movie exists in watchlater'})
        }
        else{
            watchlaterMoviesObj.movies.push(watchlaterObj.movieObj)
            await userWatchlaterCollectionObj.updateOne({username:watchlaterObj.username},{$set:{...watchlaterMoviesObj}})
            res.send({message:"Movie added to watchlater"})
        }
    }
}))

userApi.get('/watchlater/:username',expressErrorHandler(async(req,res,next)=>{
    let un=req.params.username
    let userWatchlaterCollectionObj=req.app.get("userWatchlaterCollectionObj")
    let userWatchlaterObj=await userWatchlaterCollectionObj.findOne({username:un})
    if(userWatchlaterObj==null)
        res.send({message:"Watchlater is empty"})
    else
        res.send({message:userWatchlaterObj.movies})
}))

userApi.delete('/deletemovie/:username/:movieidx',expressErrorHandler(async(req,res,next)=>{
    let un=req.params.username
    let movieIdx=req.params.movieidx
    let userWatchlaterCollectionObj=req.app.get('userWatchlaterCollectionObj')
    let userWatchlater=await userWatchlaterCollectionObj.findOne({username:un})
    let userMovies=userWatchlater.movies
    userMovies.splice(movieIdx,1)
    userWatchlater.movies=userMovies
    await userWatchlaterCollectionObj.updateOne({username:un},{$set:{...userWatchlater}})
    res.send({message:'Movie removed from watchlater'})
}))

module.exports=userApi