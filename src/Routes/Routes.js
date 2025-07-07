const express = require("express")
const { Registration, Login } = require("../Controller/AuthController")
const authLimiter = require("../Middleware/LimitMiddleware")
const { auth, roleAuthorized } = require("../Middleware/authMiddleware")
const { createCategory, getAllCategories, deleteCategory, updateCategory } = require("../Controller/CategoryController")
const { createLanguage, getAllLanguages, deleteLanguage, updateLanguage } = require("../Controller/LanguageController")
const { getAllComponent, deleteComponent, createComponent, editComponent } = require("../Controller/ComponentController")
const router = express.Router()
router.use(express.json())

//auth
router.post('/user/registration', authLimiter, Registration)
router.post('/user/login', authLimiter, Login)

//category
router.post('/category/addcategory',authLimiter, auth, roleAuthorized, createCategory)
router.get('/category/getallcategory',authLimiter, auth, getAllCategories)
router.delete('/category/deletecategory/:id',authLimiter, auth, roleAuthorized, deleteCategory)
router.put('/category/updatecategory/:id',authLimiter, auth, roleAuthorized, updateCategory)

//language
router.post('/language/addlanguage',authLimiter,auth,roleAuthorized,createLanguage)
router.get('/language/getalllanguage',authLimiter,auth,getAllLanguages)
router.delete('/language/deletelanguage/:id',authLimiter,auth,roleAuthorized,deleteLanguage)
router.put('/language/updatelanguage/:id',authLimiter, auth, roleAuthorized, updateLanguage)

// component
router.post('/component/createcomponent',authLimiter,auth,roleAuthorized,createComponent)
router.get('/component/getallcomponent',authLimiter,auth,getAllComponent)
router.delete('/component/deletecomponent/:id',authLimiter,auth,roleAuthorized,deleteComponent) 
router.put('/component/editcomponent/:id',authLimiter,auth,roleAuthorized,editComponent)

module.exports = router