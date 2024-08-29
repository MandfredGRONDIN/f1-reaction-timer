import React, { useState, useRef } from 'react'
import api from '../utils/api.jsx'

function ReactionTimer({ setReactionTimes, reactionTimes }) {
  const [isTiming, setIsTiming] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [lightSequence, setLightSequence] = useState(0)
  const [newTime, setNewTime] = useState('')
  const [submissionError, setSubmissionError] = useState(null)
  const [falseStart, setFalseStart] = useState(false)

  const timeouts = useRef([])

  const startLightSequence = () => {
    setIsTiming(true)
    setFalseStart(false)
    setLightSequence(1)

    clearAllTimeouts()

    timeouts.current.push(setTimeout(() => setLightSequence(2), 1000)) // Deuxième lumière
    timeouts.current.push(setTimeout(() => setLightSequence(3), 2000)) // Troisième lumière
    timeouts.current.push(
      setTimeout(() => {
        setLightSequence(4)
        setStartTime(Date.now())
      }, 3000),
    )
  }

  const stopTimer = async () => {
    if (!isTiming) return

    if (lightSequence !== 4) {
      setFalseStart(true)
      setIsTiming(false)
      setLightSequence(0)
      setNewTime('')
      clearAllTimeouts()
      return
    }

    const reactionTime = Date.now() - startTime
    setIsTiming(false)
    setNewTime(reactionTime)
    setLightSequence(0)

    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No token found')

      const response = await api.post(
        '/submit-reaction-time',
        { time: reactionTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setReactionTimes([...reactionTimes, response.data])
      setSubmissionError(null)
    } catch (err) {
      setSubmissionError('Failed to submit reaction time')
    }
  }

  const clearAllTimeouts = () => {
    timeouts.current.forEach((timeout) => clearTimeout(timeout))
    timeouts.current = []
  }

  return (
    <div className="reaction-timer-container">
      <div className="light-sequence">
        <div className={`light ${lightSequence >= 1 ? 'red' : ''}`} />
        <div className={`light ${lightSequence >= 2 ? 'red' : ''}`} />
        <div className={`light ${lightSequence >= 3 ? 'red' : ''}`} />
        <div className={`light ${lightSequence === 4 ? 'green' : ''}`} />
      </div>
      <button
        className="timer-button"
        onClick={startLightSequence}
        disabled={isTiming}
      >
        {isTiming ? 'Get Ready...' : 'Start F1 Reaction Timer'}
      </button>
      <button className="timer-button" onClick={stopTimer} disabled={!isTiming}>
        Stop Timer
      </button>
      {falseStart && (
        <p className="message error">
          False start! You clicked too early. Please start again.
        </p>
      )}
      {newTime && <p className="message success">Your time: {newTime} ms</p>}
      {submissionError && <p className="message error">{submissionError}</p>}
    </div>
  )
}

export default ReactionTimer
