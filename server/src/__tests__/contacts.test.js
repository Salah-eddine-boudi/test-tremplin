const request = require('supertest');
const app = require('../index');

describe('POST /api/contacts', () => {
  
  it('should create a contact with valid data', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .send({
        civility: 'M',
        lastName: 'Dupont',
        firstName: 'Jean',
        email: 'jean.dupont@email.com',
        phone: '0612345678',
        messageType: 'visit',
        message: 'Je souhaite visiter le bien.',
        availabilities: [
          { day: 'Lundi', hour: '9', minute: '00' },
          { day: 'Mercredi', hour: '14', minute: '30' }
        ]
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.lastName).toBe('Dupont');
    expect(res.body.data.availabilities).toHaveLength(2);
  });

  it('should return 400 if lastName is missing', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .send({
        civility: 'Mme',
        firstName: 'Marie',
        email: 'marie@email.com',
        phone: '0698765432',
        messageType: 'callback',
        message: ''
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('should return 400 if email format is invalid', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .send({
        civility: 'M',
        lastName: 'Martin',
        firstName: 'Paul',
        email: 'pas-un-email',
        phone: '0612345678',
        messageType: 'photos',
        message: ''
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('should return 400 if phone format is invalid', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .send({
        civility: 'M',
        lastName: 'Martin',
        firstName: 'Paul',
        email: 'paul@email.com',
        phone: '123',
        messageType: 'visit',
        message: ''
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('should create a contact without availabilities', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .send({
        civility: 'Mme',
        lastName: 'Leroy',
        firstName: 'Sophie',
        email: 'sophie@email.com',
        phone: '0687654321',
        messageType: 'callback',
        message: 'Rappel souhaité.',
        availabilities: []
      });

    expect(res.status).toBe(201);
    expect(res.body.data.availabilities).toHaveLength(0);
  });

  it('should create a contact without message', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .send({
        civility: 'M',
        lastName: 'Bernard',
        firstName: 'Luc',
        email: 'luc@email.com',
        phone: '0611223344',
        messageType: 'photos',
        message: '',
        availabilities: []
      });

    expect(res.status).toBe(201);
    expect(res.body.data.message).toBe('');
  });
});

describe('GET /api/contacts', () => {

  it('should return an array of contacts', async () => {
    const res = await request(app).get('/api/contacts');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});