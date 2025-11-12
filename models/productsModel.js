const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},

    price:{type:Number, required:true},
    discount:{type:Number,default:0},
    category:{type:mongoose.Schema.Types.ObjectId, ref:"Category", required:true},
    subCategory:{name:{type:String, required:true},description:{type:String, required:false}},
    quantity:{type:Number, required:true},

    images:[{type:String,required:true}],
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
},{timestamps:true})

module.exports = mongoose.model("Product",productSchema)