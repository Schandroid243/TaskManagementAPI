const express = require('express');
const { login, me } = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

const route = express.Router();

route.post('/login', login);
route.get('/me', requireAuth, me);

module.exports = route; 