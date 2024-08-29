import express from 'express'
import { validateRegister, validateLogin } from '../middleware/validation.js'
import { registerUser } from '../controllers/user/register.js'
import { loginUser } from '../controllers/user/login.js'

const router = express.Router()

router.post('/register', validateRegister, registerUser)

router.post('/login', validateLogin, loginUser)

export default router
