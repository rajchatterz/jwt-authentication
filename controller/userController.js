const userSchema = require('../userSchema/authSchema')

const signup= async(req,res) =>{
    const {name,email,password,confirmPassword}=req.body
    try {
        const userInfo = userSchema(req.body)
        const userData = await userInfo.save()
        return res.status(200).json({
            success:true,
            message:userData
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Signup not occured"
        })
    }
}
module.exports={
    signup
}