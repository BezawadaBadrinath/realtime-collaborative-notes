const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth'); // or your actual auth middleware

router.post('/login', authController.login); // <-- This line is required
router.post('/register', authController.register);
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;