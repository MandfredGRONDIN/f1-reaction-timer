import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './src/routes/user.js'
import timerRoutes from './src/routes/timer.js'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

dotenv.config()

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'F1 reaction timer',
      version: '1.0.0',
      description: 'This API is designed to record user reaction times.',
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
}

const specs = swaggerJsdoc(swaggerOptions)

const app = express()

app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  })
)

// MongoDB connection
const mongoUrl = process.env.MONGODB_URI

mongoose
  .connect(mongoUrl)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

// Routes
app.use('/api', userRoutes)
app.use('/api', timerRoutes)

export default app
