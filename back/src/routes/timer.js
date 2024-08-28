import express from 'express';
import { check } from 'express-validator';
import { submitReactionTime } from '../controllers/timer/create.js';
import { getReactionTimesForUser } from '../controllers/timer/read.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/submit-reaction-time',
  [auth, [check('time', 'Time is required and should be a number').isNumeric()]],
  submitReactionTime
);

router.get('/get-reaction-times/:userId', auth, getReactionTimesForUser);

export default router;
