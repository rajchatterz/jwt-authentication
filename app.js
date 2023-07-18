const express = require('express')
const app = express()
const authRouter = require('./router/userRouter')


app.use('/api/auth',authRouter)
app.use('/',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"You have succesfully deployed yoru server"
    })
})
module.exports=app