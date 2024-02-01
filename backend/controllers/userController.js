const jwt =require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler =require('express-async-handler')
const User = require('../model/userModel')
//register new user
// POST /api/users
//Public
const registerUser =asyncHandler(async(req,res)=>{
   const{name,email,password}=req.body

   if(!name || !email || !password ){
    res.status(400)
    throw new Error('please add all fields')
   }
   //check user exists
   const userExists=await User.findOne({email})
   if(userExists){
    res.status(400)
    throw new Error('user already exist')
   }
   //hash password
   const salt=await bcrypt.genSalt(10)
   const hashedPassword=await bcrypt.hash(password,salt)

   //create user 
   const user= await User.create({
    name,
    email,
    password:hashedPassword,
   })

   if(user){
    res.status(201).json({
      _id:user.id,
      name:user.name,
      email:user.email,
      profileUrl:user.profileUrl,
      token:generateToken(user._id)        
    })
   }else{
    res.status(400)
    throw new Error("invalid user data")
   }
})

  
//Authenticate new user
// POST /api/users/login
//Public
const loginUser =asyncHandler(async(req,res)=>{
   const {email,password}=req.body
   //check for user email
   const user= await User.findOne({email})

   if(user.isBlocked){
    res.status(400)
    throw new Error('Your account is currently blocked!');
}
   
   if(user&&(await bcrypt.compare(password,user.password))){
    res.json({
        _id:user.id,
        name:user.name,
        email:user.email,
        profileUrl:user.profileUrl,
        token:generateToken(user._id)  
    })
   }else{
    res.status(400)
    throw new Error("invalid credentials ")
   }
  })

  
//Get new user
// Get /api/users/me
//private
const getMe =asyncHandler(async(req,res)=>{
    res.status(200).json(req.user)  
  })

  // upload user profile
  //post/api/users/profile
  //private
  const profileUpload=asyncHandler(async(req,res)=>{
    const url=req.body.url
    // const user=req.body.liveUser
    await User.findByIdAndUpdate(req.user.id,{
      profileUrl:url
    })
    res.status(200).json(req.user)
  })


  //Generate JWT token
  const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'10d'
    })
  }
  

module.exports={
    registerUser,
    loginUser,
    getMe,
    profileUpload
}