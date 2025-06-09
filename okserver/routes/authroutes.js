const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authcontroller');    

// localhost:3000/auth/login

router.post('/login', login);

module.exports = router;