const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','user']
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('user',userSchema)