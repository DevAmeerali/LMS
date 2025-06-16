import { useEffect } from 'react';
import axios from 'axios';

const StripeConnect = () => {
  useEffect(() => {
    const connectStripe = async () => {
      try {
        const { data } = await axios.post(
          'http://localhost:5000/api/stripe/create-connect-account', // <-- fixed
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        console.log("Redirect URL:", data.url);

        if (data.url) {
          window.location.href = data.url;
        }
      } catch (error) {
        console.error('Stripe Connect error:', error);
      }
    };

    connectStripe();
  }, []);

  return <div>Redirecting to Stripe onboarding...</div>;
};

export default StripeConnect;
