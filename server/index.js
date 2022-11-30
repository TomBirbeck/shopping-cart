import express from 'express';
const app = express();
import cors from 'cors';
// This is your test secret API key.
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const calculateOrderAmount = (items) => {
  console.log('items in calc', items);
  let price = 0;
  if (items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      const value = items[i].price * items[i].quantity;
      price = price + value;
    }
  }
  return price;
};

app.get('/', (req, res) => {
  res.send({
    message: 'Ping from Checkout Server',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
});

app.post('/create-payment-intent', async (req, res) => {
  const { items } = req.body;
  console.log('server', items);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
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
