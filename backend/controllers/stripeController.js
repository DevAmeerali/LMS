const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

exports.createConnectAccount = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    // Create new connected account if not exists
    if (!user.stripeAccountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        email: user.email,
      });
      user.stripeAccountId = account.id;
      await user.save();
    }

    // Create account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: user.stripeAccountId,
      refresh_url: `${process.env.CLIENT_URL}/stripe/onboarding/refresh`,
      return_url: `${process.env.CLIENT_URL}/stripe/onboarding/return`,
      type: 'account_onboarding',
    });

    res.json({ url: accountLink.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
