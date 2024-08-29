import Timer from '../../models/Timer.js'

export const getReactionTimesForUser = async (req, res) => {
  try {
    const timers = await Timer.find({ user_id: req.params.userId }).sort({
      createdAt: -1,
    })
    res.json(timers)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
