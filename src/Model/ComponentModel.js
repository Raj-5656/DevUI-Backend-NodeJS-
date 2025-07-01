const mongoose = require("mongoose");

const codeSchema = mongoose.Schema({
  language: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
});

const componentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  code:[codeSchema]
},{timestamp:true});

module.exports=mongoose.model('component',componentSchema)

