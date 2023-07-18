require('dotenv').config()
const express = require('express')
const app = express()
const authRouter = require('./router/userRouter')
// db init
const connectoToDb = require('./config/dbconfig')

// calling the database
connectoToDb()
app.use(express.json())
app.use('/api/auth/',authRouter)
app.use('/',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"You have succesfully deployed yoru server"
    })
})
module.exports=app