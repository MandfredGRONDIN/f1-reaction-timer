import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import User from '../../models/User.js'

export const registerUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password, role } = req.body

  try {
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: 'User already exists' })

    user = new User({ email, password, role })
    await user.save()

    const payload = { id: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.json({ token })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
