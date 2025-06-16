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

        const res = await axios.post("http://localhost:5000/api/payments/verify-session", {
          sessionId,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.success) {
          setMessage("✅ You have been enrolled successfully!");
        } else {
          setMessage("⚠️ Payment was not completed.");
        }
      } catch (err) {
        console.error("Verification failed:", err.response?.data || err.message);
        setMessage("❌ Something went wrong during enrollment.");
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      verifyAndEnroll();
    } else {
      setMessage("❌ Invalid session.");
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      {loading ? (
        <p className="mt-4">Verifying payment and enrolling you in the course...</p>
      ) : (
        <>
          <p className="mt-4">{message}</p>
          <button
            onClick={() => navigate("/enrollments")}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Go to My Courses
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
