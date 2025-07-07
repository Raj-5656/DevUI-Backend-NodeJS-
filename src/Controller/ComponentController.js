const componentSchema = require("../Model/ComponentModel")
const categoryModel = require("../Model/CategoryModel")
const language = require("../Model/LanguageModel")

exports.createComponent = async (req, res) => {
    try {
        const { name, description, category, code } = req.body;

        // Convert all languages to lowercase and check for duplicates
        const lowerLangs = code.map(c => c.language.toLowerCase());
        const duplicates = lowerLangs.filter((lang, idx) => lowerLangs.indexOf(lang) !== idx);
        if (duplicates.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Duplicate languages in code array: ${[...new Set(duplicates)].join(', ')}`
            });
        }

        // Check if all provided languages exist in Language collection
        const existingLanguages = await language.find({
            name: { $in: lowerLangs }
        }).collation({ locale: 'en', strength: 2 });

        if (existingLanguages.length !== lowerLangs.length) {
            const existingNames = existingLanguages.map(l => l.name.toLowerCase());
            const invalidLanguages = lowerLangs.filter(l => !existingNames.includes(l));
            return res.status(400).json({
                success: false,
                message: `Invalid Languages: ${invalidLanguages.join(', ')}`
            });
        }

        const categoryExists = await categoryModel.findOne({ name: category }).collation({ locale: 'en', strength: 2 });
        if (!categoryExists) {
            return res.status(400).json({
                success: false,
                message: `Invalid Category: '${category}' does not exist`
            });
        }
        // Create component
        await componentSchema.create({ name, description, category, code });

        return res.status(201).json({
            success: true,
            message: "Component created successfully"
        });

    } catch (error) {
        if (error.code === 11000) {
            const key = Object.keys(error.keyPattern)[0];
            let message = "Duplicate entry.";

            if (key === "name") message = "Component name already exists.";
            if (key === "code.language" || key === "language") message = "Duplicate language entry in code.";

            return res.status(400).json({ success: false, message });
        }

        return res.status(500).json({ success: false, message: error.message });
    }
};


exports.getAllComponent = async (req, res) => {
    try {
        const component = await componentSchema.find()
        res.status(200).json({ success: true, message: "Component fetch successfully", component })
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.editComponent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, code } = req.body;

        // Basic validation
        if (!id) {
            return res.status(400).json({ success: false, message: "Component ID is required." });
        }

        // Check for duplicate languages in code
        const lowerLangs = code.map(c => c.language.toLowerCase());
        const duplicates = lowerLangs.filter((lang, idx) => lowerLangs.indexOf(lang) !== idx);
        if (duplicates.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Duplicate languages in code array: ${[...new Set(duplicates)].join(', ')}`
            });
        }

        // Check if all languages exist
        const existingLanguages = await language.find({
            name: { $in: lowerLangs }
        }).collation({ locale: 'en', strength: 2 });

        if (existingLanguages.length !== lowerLangs.length) {
            const existingNames = existingLanguages.map(l => l.name.toLowerCase());
            const invalidLanguages = lowerLangs.filter(l => !existingNames.includes(l));
            return res.status(400).json({
                success: false,
                message: `Invalid Languages: ${invalidLanguages.join(', ')}`
            });
        }
        const categoryExists = await categoryModel.findOne({ name: category }).collation({ locale: 'en', strength: 2 });
        if (!categoryExists) {
            return res.status(400).json({
                success: false,
                message: `Invalid Category: '${category}' does not exist`
            });
        }
        // Update component
        const updated = await componentSchema.findByIdAndUpdate(
            id,
            { name, description, category, code },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: "Component not found." });
        }

        return res.status(200).json({ success: true, message: "Component updated successfully", data: updated });

    } catch (error) {
        if (error.code === 11000) {
            const key = Object.keys(error.keyPattern)[0];
            let message = "Duplicate entry.";

            if (key === "name") message = "Component name already exists.";
            if (key === "code.language" || key === "language") message = "Duplicate language entry in code.";

            return res.status(400).json({ success: false, message });
        }

        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteComponent = async (req, res) => {
    try {
        const { id } = req.params
        const component = await componentSchema.findByIdAndDelete({ _id: id })
        if (component) {
            return res.status(200).json({ success: true, message: `${component?.name} component deleted successfully` })
        } else {
            return res.status(400).json({ success: false, message: "Component not found" })
        }
    } catch (error) {
        res.status(404).json(error)
    }
}