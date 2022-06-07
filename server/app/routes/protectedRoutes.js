const { Router } = require('express');

const router = Router();

router.get('/dashboard', (req, res) => {
  console.log('user in protected area', req.user);
  res.json({ user: req.user });
});

module.exports = router;
