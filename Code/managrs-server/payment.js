import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
  const { amount, milestoneId } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'usd',
    metadata: { milestoneId }
  });

  res.json({ clientSecret: paymentIntent.client_secret });
});