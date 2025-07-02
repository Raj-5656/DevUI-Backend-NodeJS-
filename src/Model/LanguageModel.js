const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
}, {
    timestamps: true,
});

languageSchema.index({ name: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

module.exports = mongoose.model("Language", languageSchema);
