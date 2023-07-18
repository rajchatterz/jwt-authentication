const express = require('express')
const { signup, signin } = require('../controller/userController')

const authRouter = express.Router()

authRouter.get('/signin',signin)
authRouter.post('/signup',signup)


module.exports=authRouter