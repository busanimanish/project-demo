const exp=require("express")
const hollywoodApi=exp.Router();
const expressErrorHandler=require("express-async-handler")
hollywoodApi.use(exp.json())
const cloudinary=require("cloudinary").v2
const multer=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary")
cloudinary.config({
    cloud_name:'dguf0ou8h',
    api_key:'192987582837397',
    api_secret:'sMVI8ALqJQNThLR_XKChV3F-ltU'
})
const clStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
        return {
            folder:"theatroflex",
            public_id:file.fieldname+'-'+Date.now()
        }
    }
})
const multerObj=multer({storage:clStorage})

hollywoodApi.post('/addmovie',multerObj.single('poster'),expressErrorHandler(async(req,res,next)=>{
    let hollywoodCollectionObj=req.app.get('hollywoodCollectionObj')
    let movieObj=JSON.parse(req.body.movieObj)
    let movie=await hollywoodCollectionObj.findOne({title:movieObj.title})
    if (movie!==null){
        res.send({message:'Movie already exists'})
    }
    else{
        movieObj.directors=movieObj.directors.split(' - ').filter((directors,idx)=>directors[idx]!='-')
        movieObj.stars=movieObj.stars.split(' -' ).filter((stars,idx)=>stars[idx]!='-')
        movieObj.genres=movieObj.genres.split(' - ').filter((genres,idx)=>genres[idx]!='-')
        movieObj.available=movieObj.available.split(' - ').filter((available,idx)=>available[idx]!='-')
        movieObj.poster=req.file.path;
        //delete movieObj.poster;
        await hollywoodCollectionObj.insertOne(movieObj)
        res.send({message:'Movie added'})
    }
}))

hollywoodApi.get('/getmovies',expressErrorHandler(async(req,res,next)=>{
    let hollywoodCollectionObj=req.app.get('hollywoodCollectionObj')
    let movies=await hollywoodCollectionObj.find().toArray()
    if(movies.length===0)
        res.send({message:'No movies'})
    else
        res.send({message:movies})
}))

hollywoodApi.get('/getmovie/:moviename',expressErrorHandler(async(req,res,next)=>{
    let hollywoodCollectionObj=req.app.get('hollywoodCollectionObj')
    let moviename=req.params.moviename
    let movie=await hollywoodCollectionObj.findOne({title:moviename})
    res.send({message:movie})
}))

hollywoodApi.delete('/deletemovie/:moviename',expressErrorHandler(async(req,res,next)=>{
    let movieName=req.params.moviename
    let hollywoodCollectionObj=req.app.get('hollywoodCollectionObj')
    await hollywoodCollectionObj.deleteOne({title:movieName})
    res.send({message:'Movie deleted'})
}))

module.exports=hollywoodApi
