import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyAndEnroll = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post("http://localhost:5000/api/payments/verify-session", { sessionId }, { headers: { Authorization: `Bearer ${token}` }});
        if (res.data.success) {
          setMessage("You have been enrolled successfully!");
        } else {
          setMessage("Payment was not completed.");
        }
      } catch (err) {
        console.error("Verification failed:", err.response?.data || err.message);
        setMessage("Something went wrong during enrollment.");
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      verifyAndEnroll();
    } else {
      setMessage("Invalid session.");
      setLoading(false);
    }
  }, [sessionId]);

  const styles = {
    container: {
      marginTop: "80px",
      textAlign: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "green",
    },
    paragraph: {
      marginTop: "20px",
      fontSize: "18px",
      color: "#333",
    },
    button: {
      marginTop: "30px",
      padding: "10px 20px",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Payment Successful!</h1>
      {loading ? (
        <p style={styles.paragraph}>Verifying payment and enrolling you in the course...</p>
      ) : (
        <>
          <p style={styles.paragraph}>{message}</p>
          <button
            onClick={() => navigate("/enrollments")}
            style={styles.button}
          >
            Go to My Courses
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
