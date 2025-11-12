const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},

    email:{type:String, required:true, unique:true,lowercase:true},
    password:{type:String, required:true},

    phone:{type:String,required:true,minLength:8},
    
    role:{type:String, enum:["user","admin"], default:"user",required:true},


    address:{
        street:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        pincode:{type:String,required:true},
        country:{type:String,required:true},
    }
},{
    timestamps:true
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

userSchema.methods.comparePaswword = async function(Enteredpassword){
    return await bcrypt.compare(Enteredpassword,this.password)
}


module.exports = mongoose.model("User",userSchema)