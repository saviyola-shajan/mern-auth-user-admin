const mongoose =require('mongoose')


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"please add name"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"please add email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please add password"],
        unique:true
    },
},{
    timestamps:true
})

module.exports=mongoose.model('User',userSchema);