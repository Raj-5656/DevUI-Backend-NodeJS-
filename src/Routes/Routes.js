const express = require("express")
const { Registration, Login } = require("../Controller/AuthController")
const authLimiter = require("../Middleware/LimitMiddleware")
const { auth, roleAuthorized } = require("../Middleware/authMiddleware")
const { createCategory, getAllCategories, deleteCategory } = require("../Controller/CategoryController")
const { createLanguage, getAllLanguages, deleteLanguage } = require("../Controller/LanguageController")
const router = express.Router()
router.use(express.json())
//auth
router.post('/user/registration', authLimiter, Registration)
router.post('/user/login', authLimiter, Login)

//category
router.post('/category/addcategory',authLimiter, auth, roleAuthorized, createCategory)
router.get('/category/getallcategory',authLimiter, auth, getAllCategories)
router.delete('/category/deletecategory/:id',authLimiter, auth, roleAuthorized, deleteCategory)


//language
router.post('/language/addlanguage',authLimiter,auth,roleAuthorized,createLanguage)
router.get('/language/getalllanguage',authLimiter,auth,getAllLanguages)
router.delete('/language/deletelanguage/:id',authLimiter,auth,roleAuthorized,deleteLanguage)



module.exports = router