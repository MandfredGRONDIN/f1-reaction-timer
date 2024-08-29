import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Reaction Timer App</h1>
      <p>Track your reaction times and improve your performance!</p>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Home
