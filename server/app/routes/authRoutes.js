const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { Users } = require('../models');

const router = Router();

const saltRounds = 10;

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, saltRounds);

  try {
    const user = await Users.create({
      email,
      password: hash,
    });

    const token = jwt.sign({ id: user.id }, process.env.SECRET);
    res.json({ token, loggedIn: true });
  } catch (error) {
    console.error(error.errors[0].message);
    return res.status(422).send(error.errors[0].message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).send({ error: 'You need an email and password' });
  }

  try {
    const [user] = await Users.findAll({
      where: {
        email,
      },
    });

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(422).send({ error: 'You need an email and password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET);
    res.json({ token, loggedIn: true });
  } catch (error) {
    console.log('ERROR >>>', error);
  }
});

module.exports = router;
