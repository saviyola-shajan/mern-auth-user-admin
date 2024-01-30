const jwt =require('jsonwebtoken')
const asyncHandler=require('express-async-handler')
const User = require('../model/userModel')
const Admin = require('../model/adminModel')

const protect=asyncHandler(async(req,res,next)=>{
let token 

if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
    try{
        //get token from header
        token = req.headers.authorization.split(' ')[1]

        //verify
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        //GET USER from token
        req.user=await User.findById(decoded.id).select('-password')

        next()
    }catch(error){
     console.log(error);
     res.status(401)
     throw new Error("Not authorized")
    }
}
if(!token){
    res.status(401)
    throw new Error("No token")
}
})

const protectAdmin=asyncHandler(async(req,res,next)=>{
    let token 
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        try{
            //get token from header
            token = req.headers.authorization.split(' ')[1]
    
            //verify
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
            //GET admin from token
            req.admin=await Admin.findById(decoded.id).select('-password')
    
            next()
        }catch(error){
         console.log(error);
         res.status(401)
         throw new Error("Not authorized")
        }
    }
    if(!token){
        res.status(401)
        throw new Error("No token")
    }
    })

module.exports={protect,protectAdmin}