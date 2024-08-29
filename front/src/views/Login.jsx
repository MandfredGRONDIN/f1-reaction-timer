import React, { useState } from 'react'
import api from '../utils/api.jsx'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/Auth.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/login', { email, password })
      localStorage.setItem('token', response.data.token)
      navigate('/dashboard')
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      } else {
        setError('Login error')
      }
      console.error('Login error:', error)
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <div className="auth-links">
        <p>Don't have an account?</p>
        <Link to="/register" className="auth-link">
          Register here
        </Link>
      </div>
    </div>
  )
}

export default Login
