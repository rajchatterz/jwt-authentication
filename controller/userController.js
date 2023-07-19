const userSchema = require('../userSchema/authSchema')
// to check the email
const emailValidator = require('email-validator')
const bcrypt = require('bcrypt')
/******************************************************
 * @SIGNUP
 * @route /api/auth/signup
 * @method POST
 * @description singUp function for creating new user
 * @body name, email, password, confirmPassword
 * @returns User Object
 ******************************************************/

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


/******************************************************
 * @SIGNIN
 * @route /api/auth/signin
 * @method POST
 * @description verify user and send cookie with jwt token
 * @body email , password
 * @returns User Object , cookie
 ******************************************************/

const signin = async(req,res)=>{
    const {email, password} = req.body
    if( !email || !password){
        return res.status(400).json({
            succes:false,
            message:"Every field is required"
        })
    }

    try {
        const user = await userSchema
    .findOne({
        email
    })
    .select('+password')
    // above code will check if that code could ablr to find the email add then pleae bring the password too

    // thses code will check wheather there is any password or not
    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(400).json({
            success:false,
            message:"Invalid cred"
        })
    }
// to mention the token
    const token = user.jwtToken();
    user.password=undefined
    const cookieOption = {
        maxAge:24*60*60*1000,
        httpOnly:true
    }
    res.cookie("token",token,cookieOption)
    return res.status(200).json({
        success:true,
        data:user
    })
    
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error
        })
    }
}
const getuser=async(req,res,next)=>{
    const userId = req.user.id
    // we have to check wheather the user logged in or not thats why we need to make a middleware
    // after using the middleware we can get the user id by token
    try {
        const user = await userSchema.findById(userId)
        return res.status(200).json({
            success:true,
            message:user
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error
        })
    }
}

const logout = (req,res)=>{
    try {
        const cookieOption = {
            expire:new Date(),
            httpOnly:true
        }
        res.cookie("token",null,cookieOption)
        res.status(200).json({
            success:true,
            message: "loggedOut"
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:e.message
        })
    }
}
module.exports={
    signup,
    signin,
    getuser,
    logout
}