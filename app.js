require('dotenv').config()
const express = require('express')
const app = express()
const authRouter = require('./router/userRouter')
// db init
const connectoToDb = require('./config/dbconfig')
// we have to fetch the cookie data
const cookieParser = require('cookie-parser')

// calling the database
connectoToDb()

app.use(cookieParser())

// to pass the json data
app.use(express.json())
// router connection
app.use('/api/auth/',authRouter)
app.use('/',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"You have succesfully deployed yoru server"
    })
})
module.exports=app