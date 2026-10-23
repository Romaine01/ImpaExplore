import { describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../../app.js';

describe('public health route', () => {
  it('returns a public status without a session', async () => {
    const response = await request(app).get('/api/v1/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: { status: 'ok' } });
  });
});

describe('route access after module split', () => {
  it.each([
    '/api/v1/auth/me',
    '/api/v1/bookings/mine',
    '/api/v1/guide/bookings',
    '/api/v1/guide/availability',
    '/api/v1/guide/packages',
    '/api/v1/admin/guide-applications',
    '/api/v1/admin/dashboard',
    '/api/v1/super-admin/users',
  ])('requires a session for %s', async path => {
    const response = await request(app).get(path);
    expect(response.status).toBe(401);
    expect(response.body.error.message).toBe('Sign in required');
  });

  it('prevents privileged responses from being cached', async () => {
    const response = await request(app).get('/api/v1/admin/dashboard');
    expect(response.headers['cache-control']).toBe('no-store');
  });

  it('rejects cross-origin mutation requests', async () => {
    const response = await request(app).post('/api/v1/auth/login').set('Origin', 'https://untrusted.example').send({});
    expect(response.status).toBe(403);
    expect(response.body.error.code).toBe('ORIGIN_DENIED');
  });

  it('validates registration before entering the auth service', async () => {
    const response = await request(app).post('/api/v1/auth/register').set('Origin', 'http://localhost:5173').send({});
    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
});
