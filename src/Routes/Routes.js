const express=require("express")
const { Registration, Login } = require("../Controller/AuthController")
const authLimiter = require("../Middleware/LimitMiddleware")
const { auth, roleAuthorized } = require("../Middleware/authMiddleware")
const { createCategory } = require("../Controller/CategoryController")
const router=express.Router()
router.use(express.json())
//auth
router.post('/user/registration',authLimiter,Registration)
router.post('/user/login',authLimiter,Login)

//category
router.post('/category',auth,roleAuthorized,createCategory)


module.exports=router