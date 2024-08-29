import request from 'supertest'
import app from '../App.js'
import User from '../src/models/User.js'

describe('User Authentication', () => {
  it('should register a new user', async () => {
    const response = await request(app).post('/api/register').send({
      email: 'testuser@example.com',
      password: 'password123',
      role: true,
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  it('should log in and return a token', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'testuser@example.com',
      password: 'password123',
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  it('should return an error for invalid credentials', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'testuser@example.com',
      password: 'wrongpassword',
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Invalid credentials')
  })

  afterAll(async () => {
    await User.deleteMany({})
  })
})
