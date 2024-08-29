import React, { useState, useEffect } from 'react'
import api from '../utils/api.jsx'
import { jwtDecode } from 'jwt-decode'
import ReactionTimesList from '../components/ReactionTimesList.jsx'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/ReactionTimesPage.css'

function ReactionTimesPage() {
  const [reactionTimes, setReactionTimes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchReactionTimes = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No token found')

        const decodedToken = jwtDecode(token)
        console.log(decodedToken)

        const userId = decodedToken.id

        const response = await api.get(`/get-reaction-times/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const sortedReactionTimes = response.data.sort(
          (a, b) => a.time - b.time,
        )

        setReactionTimes(sortedReactionTimes)
      } catch (err) {
        setError('Failed to fetch reaction times')
      } finally {
        setLoading(false)
      }
    }

    fetchReactionTimes()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className="reaction-times-container">
      <h2>Your Reaction Times</h2>
      {error && <p className="error">{error}</p>}
      {reactionTimes.length === 0 ? (
        <div className="no-data">
          <p>No reaction times found. Why not</p>
          <Link to="/reaction-timer" className="reaction-timer-link">
            try the F1 Reaction Timer
          </Link>
          ?
        </div>
      ) : (
        <>
          <ReactionTimesList reactionTimes={reactionTimes} />
          <button onClick={() => navigate(-1)} className="back-button">
            Back
          </button>
        </>
      )}
    </div>
  )
}

export default ReactionTimesPage
