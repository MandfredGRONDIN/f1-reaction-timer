import express from 'express'
import { validateRegister, validateLogin } from '../middleware/validation.js'
import { registerUser } from '../controllers/user/register.js'
import { loginUser } from '../controllers/user/login.js'

const router = express.Router()

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user with the provided credentials.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the new user.
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *               role:
 *                 type: string
 *                 description: The role for the new user (optional).
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully, returns an authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token for the user.
 *       400:
 *         description: Invalid input or user already exists.
 *       500:
 *         description: Server error.
 */
router.post('/register', validateRegister, registerUser)

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Authenticate a user
 *     description: Log in a user and return a token.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User authenticated successfully, returns an authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token for the user.
 *       400:
 *         description: Invalid credentials.
 *       500:
 *         description: Server error.
 */
router.post('/login', validateLogin, loginUser)

export default router
