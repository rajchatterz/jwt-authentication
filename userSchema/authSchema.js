const mongoose = require('mongoose')
const authSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is Mandatory'],
        minLength:[5,'Name must be in 5 char'],
        maxLength:[50,'Name must be in 50 char'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'Email is Mandatory'],
        unique:[true,'Already resisterd'],
        lowercase:true
    },
    password:{
        type:String,
        select:false
    },
    forgotPasswordToken:{
        type:String
    },
    passwordExpiry:{
        type:String
    }

},{timestamps:true})

module.exports=mongoose.model("user",authSchema)