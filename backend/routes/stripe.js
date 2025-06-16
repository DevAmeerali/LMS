const express = require('express');
const router = express.Router();
const { createConnectAccount } = require('../controllers/stripeController');
const authMiddleware = require('../middleware/authtoken');

router.post('/create-connect-account', authMiddleware, createConnectAccount);

module.exports = router;
