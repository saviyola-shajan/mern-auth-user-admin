const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Admin = require("../model/adminModel");
const User = require("../model/userModel");

//authenticate admin
//POST/api/admin/login
//public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("please add all fields");
  }

  const admin = await Admin.findOne({ email });

  if (Admin && password === admin.password) {
    res.json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

//get users list
// GEt/api/admin
//private

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users) {
    res.status(200).json({ users });
  } else {
    res.status(404);
    throw new Error("Users Not Found");
  }
});

//block user 
//post/api/admin/block
//private
const userBlock=asyncHandler(async(req,res)=>{
    const userId=req.body.userId
    const user=await User.findByIdAndUpdate(userId,{isBlock:true})
    const users=await User.find()
    if(users){
        res.status(200).json({users})
    }else{
        res.status(400)
        throw new Error('Users not found')
    }
})

//user unblock
//post/api/admin/unblock
//private
const userUnBlock=asyncHandler(async(req,res)=>{
    const userId=req.body.userId
    const user=await User.findByIdAndUpdate(userId,{isBlock:false})
    const users=await User.find()
    if(users){
        res.status(200).json({users})
    }else{
        res.status(400)
        throw new Error('Users not found')
    }
})


//search user
//get/api/admin/search
//private
const searchUser=asyncHandler(async(req,res)=>{
    const query=req.body.query
    const regex=new RegExp(`^${query}`, 'i');

    const users = await User.find({name:{$regex:regex}})
    res.status(200).json({users});
})

//edit user
//put/api/admin/userId
//private
const editUser=asyncHandler(async(req,res)=>{
    const {userId,name,email}=req.body
    const updateUser=await User.findByIdAndUpdate(userId,{name,email},{new:true})
    const users=await User.find()
    if(users){
        res.status(200).json({users})
    }else{
        res.status(404)
        throw new Error('User not Found')
    }
})


//logout

  //Generate JWT token
  const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'10d'
    })
  }
module.exports = {
  loginAdmin,
  getUsers,
  userBlock,
  userUnBlock,
  searchUser,
  editUser
};
