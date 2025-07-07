const limit=require("express-rate-limit")

const authLimiter=limit({
    windowMs:15*60*1000,
    max:100,
    message:"Too many attempt"
})

module.exports=authLimiter
