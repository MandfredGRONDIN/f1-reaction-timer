import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './src/routes/user.js';
import timerRoutes from './src/routes/timer.js';

dotenv.config();

const app = express();

app.use(express.json());

const mongoUrl = process.env.MONGODB_URI;

mongoose.connect(mongoUrl)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', userRoutes);

app.use('/api', timerRoutes);

export default app;
