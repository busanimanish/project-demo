const exp=require("express")
const adminApi=exp.Router();
const expressErrorHandler=require("express-async-handler")
const jwt=require("jsonwebtoken")
adminApi.use(exp.json())

adminApi.post('/login',expressErrorHandler(async(req,res,next)=>{
    let adminCollectionObj=req.app.get("adminCollectionObj")
    let adminLoginObj=req.body
    let admin=await adminCollectionObj.findOne({username:adminLoginObj.username})
    if (admin===null){
        res.send({message:'Invalid username'})
    }
    else{
        if(admin.password!==adminLoginObj.password){
            res.send({message:'Invalid password'})
        }
        else{
            let token=jwt.sign({username:adminLoginObj.username},process.env.SECRET,{expiresIn:"7 days"})
            res.send({message:"Login success",token:token,username:admin.username,userObj:adminLoginObj})
        }
    }
}))

module.exports=adminApi