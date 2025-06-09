// routes/stripe.js
const express = require('express');
const Stripe = require('stripe');
const router = express.Router();

const stripe = Stripe(process.env.STRIPE_API_KEY);

router.post('/create-checkout-session', async (req, res) => {
  const { courseId, courseName, amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: courseName,
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/payment-success?courseId=${courseId}`,
      cancel_url: `http://localhost:3000/payment-cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error.message);
    res.status(500).json({ error: 'Payment failed' });
  }
});

module.exports = router;
