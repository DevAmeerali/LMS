const express = require('express');
const router = express.Router();
const { createCheckoutSession, verifyCheckoutSession} = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authtoken');

router.post('/create-checkout-session',authMiddleware ,createCheckoutSession);
router.post('/verify-session', authMiddleware, verifyCheckoutSession);

module.exports = router;
