import React, { useState } from 'react'
import api from '../utils/api.jsx'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/Auth.css'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/register', { email, password, role })
      navigate('/')
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      } else {
        setError('Registration error')
      }
      console.error('Registration error:', error)
    }
  }

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div>
          <label>
            <input
              type="checkbox"
              checked={role}
              onChange={(e) => setRole(e.target.checked)}
            />
            Admin Role
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="auth-links">
        <p>Already have an account?</p>
        <Link to="/login" className="auth-link">
          Login here
        </Link>
      </div>
    </div>
  )
}

export default Register
