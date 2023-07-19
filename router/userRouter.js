const express = require('express')
const { signup, signin, getuser,logout } = require('../controller/userController')
const jwtAuth = require('../middleware/jwtAuth')

const authRouter = express.Router()

authRouter.post('/signin',signin)
authRouter.post('/signup',signup)
authRouter.get('/user',jwtAuth,getuser)
authRouter.get('/logout',jwtAuth,logout)


module.exports=authRouter