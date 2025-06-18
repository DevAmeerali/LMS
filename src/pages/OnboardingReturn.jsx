import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OnboardingReturn() {
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally, refetch user profile to check if stripe setup is completed
    setTimeout(() => {
      navigate("/instructor-dashboard");
    }, 3000);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2 style={styles.success}>Stripe Onboarding Complete!</h2>
      <p>You will be redirected to your dashboard shortly...</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    padding: "20px"
  },
  success: {
    color: "green"
  }
};
