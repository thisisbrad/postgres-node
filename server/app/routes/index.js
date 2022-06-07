const express = require('express');
const authRoutes = require('./authRoutes');
const protectedRoutes = require('./protectedRoutes');
const requireAuth = require('../middlewares/requireAuth');

module.exports = () => {
  const router = express.Router();
  router.get('/', (req, res) => {
    res.json({ howdy: 'partner!' });
  });

  router.use('/auth', authRoutes);
  router.use('/api', requireAuth, protectedRoutes);
  return router;
};
