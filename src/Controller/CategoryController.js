const categorySchema = require('../Model/CategoryModel')

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body
        await categorySchema.create({ name })
        res.status(200).json({ success: true, message: "category created successfully" })
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "category already exists." });
        } else {
            res.status(404).json(error)
        }
    }
}

exports.getAllCategories = async (req, res) => {
    try {
        const categories =  await categorySchema.find()
        console.log(categories);
        
        res.status(200).json({success:true,message:"categories fetch successfully",categories})
    } catch (error) {
         res.status(404).json(error)
    }
}

exports.deleteCategory = async (req,res) => {
    try {
        const {id} = req.params
        console.log(id);
        const category = await categorySchema.findByIdAndDelete(id)
        console.log(category);
        res.status(200).json({success:true,message:`${category.name} deleted successfully`})
    } catch (error) {
        res.status(404).json(error)
    }
}