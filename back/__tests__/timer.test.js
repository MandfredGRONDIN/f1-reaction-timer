import request from 'supertest';
import app from '../App.js';
import User from '../src/models/User.js';
import Timer from '../src/models/Timer.js';

describe('Timer Management', () => {
  let token;
  let userId;

  beforeAll(async () => {
    const user = new User({
      email: 'testtimeruser@example.com',
      password: 'password123',
      role: false
    });
    await user.save();
    userId = user._id;

    const loginResponse = await request(app)
      .post('/api/login')
      .send({
        email: 'testtimeruser@example.com',
        password: 'password123'
      });
    
    token = loginResponse.body.token;
  });

  it('should submit a reaction time', async () => {
    const response = await request(app)
      .post('/api/submit-reaction-time')
      .set('Authorization', `Bearer ${token}`)
      .send({
        time: 300
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('time', 300);
  });

  it('should retrieve reaction times for a user', async () => {
    await new Timer({
      user_id: userId,
      time: 250
    }).save();

    const response = await request(app)
      .get(`/api/get-reaction-times/${userId}`)
      .set('Authorization', `Bearer ${token}`);
      
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('time', 250);
  });

  it('should return an error for missing token', async () => {
    const response = await request(app)
      .post('/api/submit-reaction-time')
      .send({
        time: 300
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('msg', 'No token, authorization denied');
  });

  afterAll(async () => {
    await Timer.deleteMany({}); 
    await User.deleteMany({});
  });
});
