const express = require('express')
const { signup } = require('../controller/userController')

const authRouter = express.Router()

authRouter.post('/signup',signup)


module.exports=authRouter