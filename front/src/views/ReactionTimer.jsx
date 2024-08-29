import React, { useState } from 'react'
import ReactionTimer from '../components/ReactionTimer.jsx'
import { useNavigate } from 'react-router-dom'
import '../styles/ReactionTimerPage.css'

function ReactionTimerPage() {
  const [reactionTimes, setReactionTimes] = useState([])
  const navigate = useNavigate()

  return (
    <div className="reaction-timer-page-container">
      <h2>F1 Reaction Timer</h2>
      <ReactionTimer
        setReactionTimes={setReactionTimes}
        reactionTimes={reactionTimes}
      />
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
    </div>
  )
}

export default ReactionTimerPage
