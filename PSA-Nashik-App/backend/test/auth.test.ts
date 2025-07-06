


import request from 'supertest';
import app from '../src/index';

describe('Authentication API', () => {
  it('should send OTP to valid phone', async () => {
    const res = await request(app)
      .post('/api/auth/send-otp')
      .send({ phone: '9876543210' });
    expect(res.statusCode).toEqual(200);
  });

  it('should reject invalid phone', async () => {
    const res = await request(app)
      .post('/api/auth/send-otp')
      .send({ phone: '123' });
    expect(res.statusCode).toEqual(400);
  });

  it('should verify valid OTP', async () => {
    // First get OTP
    await request(app)
      .post('/api/auth/send-otp')
      .send({ phone: '9876543210' });
      
    const res = await request(app)
      .post('/api/auth/verify-otp')
      .send({ phone: '9876543210', otp: '123456' }); // Mock OTP for testing
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});


