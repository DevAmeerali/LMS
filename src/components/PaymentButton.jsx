import axios from 'axios';

const PaymentButton = ({ course }) => {
  const handleCheckout = async () => {
    try {
      const response = await axios.post('/api/stripe/create-checkout-session', {
        courseId: course._id,
        courseName: course.title,
        amount: course.price,
      });
      window.location.href = response.data.url; // Redirect to Stripe checkout
    } catch (error) {
      console.error('Stripe checkout error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <button onClick={handleCheckout}>
      Buy "{course.title}" for ${course.price}
    </button>
  );
};

export default PaymentButton;
