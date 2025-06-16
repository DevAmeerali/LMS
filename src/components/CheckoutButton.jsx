import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe('pk_test_51RVZ2n4CtuxFChJ2p7kbZHjGN5Mli9vN1WqG75EtvltkkIhNU9GwGgsLokElc80PNmIB5Q1SAFOQRF9qd6JZcFGD00qzuDwCU8'); // Replace with your actual publishable key

function CheckoutButton({ course }) {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    // Load Stripe only once when component mounts
    stripePromise.then((loadedStripe) => {
      setStripe(loadedStripe);
    });
  }, []);

  const handleCheckout = async () => {
    if (!stripe) {
      console.error('Stripe not loaded');
      return;
    }

    const res = await fetch('http://localhost:5000/api/payments/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ courseId: course._id }),
    });

    const data = await res.json();

    if (data.id) {
      // Proper redirect using Stripe SDK
      const result = await stripe.redirectToCheckout({ sessionId: data.id });

      if (result.error) {
        console.error('Stripe redirect error:', result.error.message);
      }
    } else {
      console.error('Failed to create checkout session:', data);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      style={{
        padding: "10px 16px",
        backgroundColor: "#27ae60",
        color: "white",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer"
      }}
    >
      Buy Now
    </button>
  );
}

export default CheckoutButton;
