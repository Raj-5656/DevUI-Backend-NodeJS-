const mongoose=require("mongoose")

const languageSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    }
},{timestamp:true})

module.exports=mongoose.model('language',languageSchema)