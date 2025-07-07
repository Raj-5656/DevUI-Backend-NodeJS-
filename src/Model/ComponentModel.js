const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  code: {
    type: String,
    required: true
  },
});
const componentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  code: [codeSchema]
}, { timestamps: true });

componentSchema.index({ name: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } })
module.exports = mongoose.model('component', componentSchema)

