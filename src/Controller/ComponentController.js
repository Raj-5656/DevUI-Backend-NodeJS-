const componentSchema = require("../Model/ComponentModel")
const language = require("../Model/LanguageModel")
exports.addComponent = async (req, res) => {
    try {
        const { name, description, code } = req.body
        const requestedLanguage = code.map((lan) => lan.language.toLowerCase())
        const existingLanguage = await language.find({
            name: { $in: requestedLanguage }
        }).collation({ locale: 'en', strength: 2 })

        if (existingLanguage.length !== requestedLanguage.length) {
            const existinglan = existingLanguage.map((lan) => lan.language.toLowerCase())
            const invalidLanguage = requestedLanguage.filter((l) => !existinglan.includes(l))
            return res.status(400).json({
                success: false,
                message: `Invalid Languages : ${invalidLanguage.join(' , ')}`
            })
        }
        await componentSchema.create({ name: name, description: description, code: code })
        return res.status(200).json({ success: true, message: "Component created successfully" })
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Component already exists." });
        } else {
            res.status(400).json(error)
        }
    }
}

exports.getAllComponent = async (req, res) => {
    try {
        const component = await componentSchema.find()
        res.status(200).json({ success: true, message: "Component fetch successfully", component })
    } catch (error) {
        res.status(404).json(error)
    }
}