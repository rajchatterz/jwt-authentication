const JWT = require('jsonwebtoken')


// now we have to make a middleware


// in middleware we have to use the next to pass the process from one to another 
const jwtAuth = (req,res,next) =>{

    const token = (req.cookies && req.cookies.token) || null

    if(!token){
        return res.status(400).json({
            success:false,
            message:"token doesn't exist"
        })
    }
    try {
        const payload = JWT.verify(token,process.env.SECRET)
        req.user = {id:payload.id,email:payload.email}
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"There is a problem with your token"
        })
    }
    next()
}

module.exports=jwtAuth