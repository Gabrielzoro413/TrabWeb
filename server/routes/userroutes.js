const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.post('/register', async (req, res) => {
  try {
    const novoUsuario = new User(req.body);
    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
