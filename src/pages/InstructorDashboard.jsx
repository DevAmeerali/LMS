// import { Link } from "react-router-dom";
export default function InstructorDashboard() {
const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.container}>
      <h1 style={styles.greeting}>Welcome, {user?.name} 🎓</h1>
      <p style={styles.subtext}>
        Manage your courses, add new content, and guide your students to success.
      </p>

      {/* <div style={styles.cardContainer}>
        <Link to="/add-course" style={styles.card}>
          <span style={styles.emoji}>➕</span>
          <h3 style={styles.cardTitle}>Add New Course</h3>
          <p style={styles.cardDescription}>Create and share a new course with students.</p>
        </Link>
      </div> */}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "4rem auto",
    padding: "2rem",
    textAlign: "center",
  },
  greeting: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    color: "#2d3436",
  },
  subtext: {
    fontSize: "1.2rem",
    color: "#636e72",
    marginBottom: "3rem",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    flexWrap: "wrap",
  },
  card: {
    textDecoration: "none",
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    width: "280px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    color: "#2d3436",
  },
  emoji: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
  },
  cardTitle: {
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
  },
  cardDescription: {
    fontSize: "1rem",
    color: "#636e72",
  },
};
