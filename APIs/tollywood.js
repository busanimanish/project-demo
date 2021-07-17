const exp=require("express")
const tollywoodApi=exp.Router();
const expressErrorHandler=require("express-async-handler")
tollywoodApi.use(exp.json())
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

tollywoodApi.post('/addmovie',multerObj.single('poster'),expressErrorHandler(async(req,res,next)=>{
    let tollywoodCollectionObj=req.app.get('tollywoodCollectionObj')
    let movieObj=JSON.parse(req.body.movieObj)
    let movie=await tollywoodCollectionObj.findOne({title:movieObj.title})
    if (movie!==null){
        res.send({message:'Movie already exists'})
    }
    else{
        movieObj.directors=movieObj.directors.split(' - ').filter((directors,idx)=>directors[idx]!='-')
        movieObj.stars=movieObj.stars.split(' - ').filter((stars,idx)=>stars[idx]!='-')
        movieObj.genres=movieObj.genres.split(' - ').filter((genres,idx)=>genres[idx]!='-')
        movieObj.available=movieObj.available.split(' - ').filter((available,idx)=>available[idx]!='-')
        movieObj.poster=req.file.path;
        //delete movieObj.poster;
        await tollywoodCollectionObj.insertOne(movieObj)
        res.send({message:'Movie added'})
    }
}))

tollywoodApi.get('/getmovies',expressErrorHandler(async(req,res,next)=>{
    let tollywoodCollectionObj=req.app.get('tollywoodCollectionObj')
    let movies=await tollywoodCollectionObj.find().toArray()
    if(movies.length===0)
        res.send({message:'No movies'})
    else
        res.send({message:movies})
}))

tollywoodApi.get('/getmovie/:moviename',expressErrorHandler(async(req,res,next)=>{
    let tollywoodCollectionObj=req.app.get('tollywoodCollectionObj')
    let moviename=req.params.moviename
    let movie=await tollywoodCollectionObj.findOne({title:moviename})
    res.send({message:movie})
}))

tollywoodApi.delete('/deletemovie/:moviename',expressErrorHandler(async(req,res,next)=>{
    let movieName=req.params.moviename
    let tollywoodCollectionObj=req.app.get('tollywoodCollectionObj')
    await tollywoodCollectionObj.deleteOne({title:movieName})
    res.send({message:'Movie deleted'})
}))

tollywoodApi.put('/updatemovie/:moviename',multerObj.single('poster'),expressErrorHandler(async(req,res,next)=>{
    let movieName=req.params.moviename
    let movieObj=JSON.parse(req.body.movieObj)
    let tollywoodCollectionObj=req.app.get('tollywoodCollectionObj')
    movieObj.directors=movieObj.directors.split(' - ').filter((directors,idx)=>directors[idx]!='-')
    movieObj.stars=movieObj.stars.split(' - ').filter((stars,idx)=>stars[idx]!='-')
    movieObj.genres=movieObj.genres.split(' - ').filter((genres,idx)=>genres[idx]!='-')
    movieObj.available=movieObj.available.split(' - ').filter((available,idx)=>available[idx]!='-')
    movieObj.poster=req.file.path;
    //movieObj.poster2=req.files[1]
    await tollywoodCollectionObj.updateOne({title:movieName},{$set:{...movieObj}})
    res.send({message:"Movie updated"})
}))

module.exports=tollywoodApi
