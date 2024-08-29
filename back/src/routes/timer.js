import express from 'express'
import { check } from 'express-validator'
import { submitReactionTime } from '../controllers/timer/create.js'
import { getReactionTimesForUser } from '../controllers/timer/read.js'
import auth from '../middleware/auth.js'

const router = express.Router()

/**
 * @openapi
 * /submit-reaction-time:
 *   post:
 *     summary: Submit a reaction time
 *     description: Save a reaction time for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               time:
 *                 type: number
 *                 description: The reaction time in milliseconds.
 *             required:
 *               - time
 *     responses:
 *       200:
 *         description: Reaction time submitted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the reaction time entry.
 *                 user_id:
 *                   type: string
 *                   description: The ID of the user who submitted the reaction time.
 *                 time:
 *                   type: number
 *                   description: The reaction time in milliseconds.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the reaction time was created.
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Server error.
 */
router.post(
  '/submit-reaction-time',
  [
    auth,
    [check('time', 'Time is required and should be a number').isNumeric()],
  ],
  submitReactionTime
)

/**
 * @openapi
 * /get-reaction-times/{userId}:
 *   get:
 *     summary: Get reaction times for a user
 *     description: Retrieve all reaction times for a specific user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose reaction times are to be retrieved.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved reaction times.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the reaction time entry.
 *                   user_id:
 *                     type: string
 *                     description: The ID of the user who submitted the reaction time.
 *                   time:
 *                     type: number
 *                     description: The reaction time in milliseconds.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the reaction time was created.
 *       500:
 *         description: Server error.
 */
router.get('/get-reaction-times/:userId', auth, getReactionTimesForUser)

export default router
