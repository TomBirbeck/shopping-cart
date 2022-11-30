import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from './CheckoutForm';
import { useShoppingCart } from '../../context/ShoppingCartContext';
// import './CheckoutPage.css';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const apiKey =
  'Bearer pk_test_51LrhJqL9k0WiBR0oYbBYn8EZigGfFh4Zd7AEUBJOBcqG8Y7uffSGA1BEuZ3660XaNMiwT83jXcoHf75OveFFj3KQ00wjRX471I';
const stripePromise = loadStripe(apiKey);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');
  const { cartItems } = useShoppingCart();

  useEffect(() => {
    void Secret();
  }, []);

  async function Secret() {
    console.log(cartItems);
    // Create PaymentIntent as soon as the page loads
    const res = await fetch('http://localhost:4242/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey,
      },
      body: JSON.stringify({
        items: cartItems,
      }),
    });
    const data = await res.json();
    console.log(data);
    setClientSecret(data.clientSecret);
    return;
  }

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch('/create-payment-intent', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options: Object = {
    clientSecret,
    appearance,
  };

  return (
    <div className='App'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
