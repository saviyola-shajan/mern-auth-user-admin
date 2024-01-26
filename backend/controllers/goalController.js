const asyncHandler =require('express-async-handler')

//@desc Get goals
//@route GET/api/goals
//@access private
const getGoals= asyncHandler(async (req,res)=>{
   res.status(200).json({message:"Get Goals"}) 
})

// Set goals
// POST/api/goals
// private
const setGoal=asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error("please add text file")
    }
    res.status(200).json({message:"Set Goals"}) 
 })

 // Update goals
// PUT/api/goals/;id
// private
const updateGoal=asyncHandler( async (req,res)=>{
    res.status(200).json({message:`Update Goals ${req.params.id}`}) 
 })

 // Delete goals
// Delete/api/goals/:id
// private
const deleteGoal=asyncHandler( async (req,res)=>{
    res.status(200).json({message:`Delete Goals ${req.params.id}`}) 
 })



module.exports={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}