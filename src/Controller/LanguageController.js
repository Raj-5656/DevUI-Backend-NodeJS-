const CategoryModel = require("../Model/CategoryModel")
const languageSchema = require("../Model/LanguageModel")

exports.createLanguage = async (req, res) => {
    try {
        const { name } = req.body
        await languageSchema.create({ name: name })
        res.status(200).json({ success: true, message: "Language created successfully" })
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Language already exists." });
        } else {
            res.status(400).json(error)
        }
    }
}

exports.getAllLanguages = async (req, res) => {
    try {
        const languages =  await languageSchema.find()
        res.status(200).json({success:true,message:"languages fetch successfully",languages})
    } catch (error) {
         res.status(404).json(error)
    }
}

exports.deleteLanguage = async (req,res) => {
    try {
        const {id} = req.params
        const languages = await languageSchema.findByIdAndDelete(id)
        res.status(200).json({success:true,message:`${languages.name} deleted successfully`})
    } catch (error) {
        res.status(404).json(error)
    }
}