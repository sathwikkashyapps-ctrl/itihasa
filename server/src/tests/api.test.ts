import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../index';

describe('Itihasa API Endpoints', () => {
  it('GET /api/health should return ok status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.app).toContain('Itihasa');
  });

  it('GET /api/sites should return paginated sites', async () => {
    const res = await request(app).get('/api/sites?limit=5');
    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.pagination.total).toBeGreaterThanOrEqual(12);
  });

  it('GET /api/sites/:slug should return a single site with images and related sites', async () => {
    const res = await request(app).get('/api/sites/amer-fort');
    expect(res.status).toBe(200);
    expect(res.body.site).toBeDefined();
    expect(res.body.site.slug).toBe('amer-fort');
    expect(res.body.site.name).toContain('Amer Fort');
    expect(res.body.site.images).toBeInstanceOf(Array);
  });

  it('GET /api/events should return cultural events', async () => {
    const res = await request(app).get('/api/events');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /api/events/:slug/ics should generate a valid iCalendar .ics download', async () => {
    const res = await request(app).get('/api/events/hampi-utsav-2026/ics');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/calendar');
    expect(res.text).toContain('BEGIN:VCALENDAR');
    expect(res.text).toContain('Hampi Utsav');
    expect(res.text).toContain('END:VCALENDAR');
  });

  it('GET /api/stats should return summary counters and analytics', async () => {
    const res = await request(app).get('/api/stats');
    expect(res.status).toBe(200);
    expect(res.body.counters.sites).toBeGreaterThanOrEqual(12);
    expect(res.body.analytics.topSites).toBeInstanceOf(Array);
  });

  it('POST /api/submissions should accept public submissions and filter honeypot spam', async () => {
    const validSubmission = {
      type: 'story',
      submitterName: 'Rohan Verma',
      submitterEmail: 'rohan@example.com',
      payload: {
        title: 'Folklore of the Western Ghats',
        details: 'Ancient oral lore from the sacred groves of Coorg.'
      }
    };

    const res = await request(app).post('/api/submissions').send(validSubmission);
    expect(res.status).toBe(201);
    expect(res.body.submissionId).toBeDefined();

    // Spam honeypot test: if honeypot has value, it returns fake success without error
    const spamSubmission = {
      ...validSubmission,
      honeypot: 'http://spam-link.ru'
    };
    const spamRes = await request(app).post('/api/submissions').send(spamSubmission);
    expect(spamRes.status).toBe(201);
    expect(spamRes.body.id).toBe('fake-id');
  });

  it('POST /api/auth/login should authenticate the admin user and return JWT', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'admin@itihasa.org',
      password: 'admin123'
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.role).toBe('admin');
  });
});
