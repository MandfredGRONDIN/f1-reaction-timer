import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Dashboard.css'

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Welcome to the F1 Reaction Timer</h2>
      <p>Choose an option below:</p>
      <ul>
        <li>
          <Link to="/reaction-times">View Your Reaction Times</Link>
        </li>
        <li>
          <Link to="/reaction-timer">Try the F1 Reaction Timer</Link>
        </li>
      </ul>
    </div>
  )
}

export default Dashboard
