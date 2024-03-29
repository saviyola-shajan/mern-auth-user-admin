const asyncHandler =require('express-async-handler')
const Goal = require('../model/goalModel')
const User=require('../model/userModel')
//@desc Get goals
//@route GET/api/goals
//@access private
const getGoals= asyncHandler(async (req,res)=>{
    const goals = await Goal.find({user:req.user.id})
   res.status(200).json(goals) 
})

// Set goals
// POST/api/goals
// private
const setGoal=asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error("please add text file")
    }
    const goal =await Goal.create({
        text: req.body.text,
        user:req.user.id
    })
    res.status(200).json(goal) 
 })

 // Update goals
// PUT/api/goals/;id
// private
const updateGoal=asyncHandler( async (req,res)=>{

    const goal=await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
     
    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    //make sure logged in uses matches the goal user
    if(goal.user.toString() !== req.user.id){
     res.status(401)
     throw new Error('User not authorized')
    }
    const updatedGoal=await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })
    res.status(200).json(updatedGoal) 
 })

 // Delete goals
// Delete/api/goals/:id
// private
const deleteGoal=asyncHandler( async (req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }


    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    //make sure logged in uses matches the goal user
    if(goal.user.toString() !== req.user.id){
     res.status(401)
     throw new Error('User not authorized')
    }
    
    await Goal.deleteOne({_id:req.params.id})
    res.status(200).json({id:req.params.id}) 
 })



module.exports={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}