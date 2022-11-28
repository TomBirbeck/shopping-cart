import express from 'express';
const app = express();
// This is your test secret API key.
import stripe from 'stripe';
const pay = stripe(process.env.STRIPE_SECRET_KEY);
app.use(express.static('public'));
app.use(express.json());

const calculateOrderAmount = (items) => {
  console.log('items', items);
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post('/create-payment-intent', async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await pay.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'gbp',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log('Node server listening on port 4242!'));
