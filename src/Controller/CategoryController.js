const categorySchema = require('../Model/CategoryModel')

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body
        await categorySchema.create({ name })
        res.status(200).json({ success: true, message: "category created successfully" })
    } catch (error) {
        res.status(404).json(error)
    }
}

