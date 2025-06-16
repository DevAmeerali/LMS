export default function InstructorDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.container}>
      <h1 style={styles.greeting}>Welcome, {user?.name} 🎓</h1>
      <p style={styles.subtext}>
        Manage your courses, add new content, and guide your students to success.
      </p>
      <a href="/stripe-connect" style={styles.connectButton}>
        Connect Stripe Account
      </a>
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
  connectButton: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
};
