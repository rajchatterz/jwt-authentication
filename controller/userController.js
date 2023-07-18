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