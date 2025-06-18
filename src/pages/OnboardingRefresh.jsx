import { useNavigate } from "react-router-dom";

export default function OnboardingRefresh() {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/instructor/stripe-setup");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.error}>Stripe Onboarding Failed or Canceled</h2>
      <p>Please try again to complete your payment setup.</p>
      <button style={styles.button} onClick={handleRetry}>
        Retry Onboarding
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    padding: "20px"
  },
  error: {
    color: "red"
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};
