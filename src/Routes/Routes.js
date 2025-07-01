const express=require("express")
const { Registration } = require("../Controller/AuthController")
const router=express.Router()
router.use(express.json())
router.post('/user/registration',Registration)

module.exports=router