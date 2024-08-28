import Timer from '../../models/Timer.js';
import { validationResult } from 'express-validator';

export const submitReactionTime = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { time } = req.body;

  try {
    const timer = new Timer({
      user_id: req.user.id, 
      time,
    });

    await timer.save();
    res.json(timer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
