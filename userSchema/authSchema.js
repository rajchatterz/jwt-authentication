const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
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


// to define the jwt token
authSchema.methods={
    jwtToken(){
        return JWT.sign(
            {id:this._id,email:this.email},
            process.env.SECRET,
            {expiresIn:'12h'}
        )
    }
}

// by the help of mongoose we can pass the custom method
authSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

module.exports=mongoose.model("user",authSchema)