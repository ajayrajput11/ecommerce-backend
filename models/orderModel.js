const mongoose = require('mongoose');




const orderItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{type:Number, required:true, min:1},
    price:{type:Number, required:true}
    })

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    address:{
        street:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        pincode:{type:String,required:true},
        country:{type:String,required:true},
    },
    orderItems:[orderItemSchema],
    totalPrice:{type:Number,required:true},
    payment:{
        type:String,
        enum:["cod","card","upi"],
        default:"cod"
    },
    paymentStatus:{
        type:String,
        enum:["pending","completed","failed"],
        default:"pending"
    },
    deliveryStatus:{
        type:String,
        enum:["pending","shipped","delivered","cancelled"],
        default:"pending"
    },
},{timestamps:true})


module.exports = mongoose.model("Order",orderSchema)