const express = require('express')
const { signup, signin, getuser } = require('../controller/userController')
const jwtAuth = require('../middleware/jwtAuth')

const authRouter = express.Router()

authRouter.post('/signin',signin)
authRouter.post('/signup',signup)
authRouter.get('/user',jwtAuth,getuser)


module.exports=authRouter