import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      alert("Reset link sent to your email");
    } catch (err) {
      alert("Failed to send email");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Send Reset Link</button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: "400px",
    margin: "3rem auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333",
  },
  input: {
    width: "100%",
    marginBottom: "1rem",
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }
};
