const userSchema = require('../userSchema/authSchema')
// to check the email
const emailValidator = require('email-validator')

const signup= async(req,res) =>{
    const {name,email,password,confirmPassword}=req.body

    if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({
            succes:false,
            message:"Every field is required"
        })
    }
    // to check wheather user give us the right email adderess or not

    const validEmail = emailValidator.validate(email)
    if(!validEmail){
        return res.status(400).json({
            succes:false,
            message:"Please provide the valid email id"
        })
    }
    // to check the password or confirmpassword are same or not
    if(password !== confirmPassword){
        return res.status(400).json({
            succes:false,
            message:"Password Doesn't match"
        })
    }
    try {
        const userInfo = userSchema(req.body)
        const userData = await userInfo.save()
        return res.status(200).json({
            success:true,
            message:userData
        })
    } catch (error) {
        // to check wheather we use the same email id t resister
        
        if(error.code ===11000){
            return res.status(400).json({
                success:false,
                message:"Account already exist with provided email id"
            })
        }
        res.status(400).json({
            success:false,
            message:"Signup not occured"
        })
    }
}
const signin = async(req,res)=>{
    const {email, password} = req.body
    if( !email || !password){
        return res.status(400).json({
            succes:false,
            message:"Every field is required"
        })
    }

    const user = await userSchema
    .findOne({
        email
    })
    .select('+password')
    // above code will check if that code could ablr to find the email add then pleae bring the password too

    // thses code will check wheather there is any password or not
    if(!user || user.password===password){
        return res.status(400).json({
            success:false,
            message:"Invalid cred"
        })
    }
    try {

    const userData = await userSchema(req.body)
    return res.status(200).json({
        success:true,
        message:"You have successfully logged in"

    })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error login"
        })
    }
}
module.exports={
    signup,
    signin
}