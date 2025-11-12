const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:false},
},{timestamps:true})    

const categorySchema = new mongoose.Schema({
    name:{type:String, required:true, unique:true},
    description:{type:String, required:true},
    subCategories:[subCategorySchema]
},{timestamps:true})


module.exports = mongoose.model("Category",categorySchema)