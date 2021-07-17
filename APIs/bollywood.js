const exp=require("express")
const bollywoodApi=exp.Router();
const expressErrorHandler=require("express-async-handler")
bollywoodApi.use(exp.json())
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

bollywoodApi.post('/addmovie',multerObj.single('poster'),expressErrorHandler(async(req,res,next)=>{
    let bollywoodCollectionObj=req.app.get('bollywoodCollectionObj')
    let movieObj=JSON.parse(req.body.movieObj)
    let movie=await bollywoodCollectionObj.findOne({title:movieObj.title})
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
        await bollywoodCollectionObj.insertOne(movieObj)
        res.send({message:'Movie added'})
    }
}))

bollywoodApi.get('/getmovies',expressErrorHandler(async(req,res,next)=>{
    let bollywoodCollectionObj=req.app.get('bollywoodCollectionObj')
    let movies=await bollywoodCollectionObj.find().toArray()
    if(movies.length===0)
        res.send({message:'No movies'})
    else
        res.send({message:movies})
}))

bollywoodApi.get('/getmovie/:moviename',expressErrorHandler(async(req,res,next)=>{
    let bollywoodCollectionObj=req.app.get('bollywoodCollectionObj')
    let moviename=req.params.moviename
    let movie=await bollywoodCollectionObj.findOne({title:moviename})
    res.send({message:movie})
}))

bollywoodApi.delete('/deletemovie/:moviename',expressErrorHandler(async(req,res,next)=>{
    let movieName=req.params.moviename
    let bollywoodCollectionObj=req.app.get('bollywoodCollectionObj')
    await bollywoodCollectionObj.deleteOne({title:movieName})
    res.send({message:'Movie deleted'})
}))

module.exports=bollywoodApi
