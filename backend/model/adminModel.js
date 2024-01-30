const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add name']
    },
    email:{
        type:String,
        required:[true,'please add email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please add password']
    }
},{
    timestamps:true
})
module.exports=mongoose.model('Admin',adminSchema)