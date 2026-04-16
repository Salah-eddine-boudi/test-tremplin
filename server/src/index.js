const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// POST — Créer un contact
app.post('/api/contacts', async (req, res) => {
  try {
    const { civility, lastName, firstName, email, phone, messageType, message, availabilities } = req.body;

    if (!lastName || !firstName || !email || !phone) {
      return res.status(400).json({
        error: 'Les champs nom, prénom, email et téléphone sont obligatoires.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Format d\'email invalide.' });
    }

    const phoneRegex = /^[\d\s\+\-\.()]{10,}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: 'Format de téléphone invalide.' });
    }

    const contact = await prisma.contact.create({
      data: {
        civility: civility || 'M',
        lastName,
        firstName,
        email,
        phone,
        messageType: messageType || 'visit',
        message: message || '',
        availabilities: {
          create: (availabilities || []).map(a => ({
            day: a.day,
            hour: a.hour,
            minute: a.minute
          }))
        }
      },
      include: { availabilities: true }
    });

    res.status(201).json({
      success: true,
      message: 'Votre demande a bien été enregistrée.',
      data: contact
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur serveur. Veuillez réessayer.' });
  }
});

// GET — Lister les contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      include: { availabilities: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  });
}

module.exports = app;