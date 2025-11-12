const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({

    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true,
        ref:"User",
    },
    products:[

        {type:mongoose.Schema.Types.ObjectId,  
            ref:"Product",
            required:true
        },

    ],
},{timestamps:true})

module.exports = mongoose.model("WishList",wishListSchema)