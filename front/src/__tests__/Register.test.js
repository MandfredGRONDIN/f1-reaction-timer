import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Register from '../views/Register'
import { BrowserRouter as Router } from 'react-router-dom'
import api from '../utils/api'

// Mock de l'API
jest.mock('../utils/api')

describe('Register Component', () => {
  test('renders registration form', () => {
    render(
      <Router>
        <Register />
      </Router>,
    )

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Register/i }),
    ).toBeInTheDocument()
  })

  test('shows error message on failed registration', async () => {
    api.post.mockRejectedValueOnce({
      response: { data: { message: 'Registration error' } },
    })

    render(
      <Router>
        <Register />
      </Router>,
    )

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Register/i }))

    expect(await screen.findByText('Registration error')).toBeInTheDocument()
  })
})
