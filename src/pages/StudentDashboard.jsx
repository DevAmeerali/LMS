// import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome, {user?.name} 👋</h2>
      <p style={styles.subheading}>"Ready to learn something new and take one step closer to your goals?"</p>
      
      {/* <div style={styles.cardContainer}>
        <Link to="/courses" style={styles.card}>
          📚 View All Courses
        </Link>
        <Link to="/enrollments" style={styles.card}>
          ✅ My Enrollments
        </Link>
        <Link to="/" style={styles.card}>
          🏠 Back to Home
        </Link>
      </div> */}
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  subheading: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "2rem",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    flexWrap: "wrap",
  },
  card: {
    padding: "1.5rem 2rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    textDecoration: "none",
    color: "#333",
    fontSize: "1.1rem",
    boxShadow: "2px 2px 12px rgba(0,0,0,0.05)",
    transition: "0.3s",
  },
};
