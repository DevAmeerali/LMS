const express = require('express')
const router = express.Router();
const {login, signup, forgotPassword, resetPassword} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;