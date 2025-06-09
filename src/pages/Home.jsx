import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/courses")
      .then(res => setCourses(res.data))
      .catch(err => console.error("Failed to load courses:", err));
  }, []);

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>All the skills you need in one place</h1>
      <p style={styles.subtext}>
        Discover courses that help you grow. Start learning today!
      </p>

      <div style={styles.cardGrid}>
        {courses.map((course, index) => (
          <div
            key={course._id}
            style={{
              ...styles.card,
              ...(hoveredCard === index ? styles.cardHover : {})
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h2 style={styles.cardTitle}>{course.title}</h2>
            <p style={styles.cardDesc}>
              {course.description?.slice(0, 100) || "No description provided."}
            </p>

            <div
              style={{
                ...styles.contentBox,
                maxHeight: hoveredCard === index ? "200px" : "0",
                opacity: hoveredCard === index ? 1 : 0,
              }}
            >
              <h4 style={styles.contentHeading}>What you'll learn:</h4>
              <ul style={styles.contentList}>
                {course.content.map((item, i) => (
                  <li key={i} style={styles.contentItem}>
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "50px 15px",
    background: "linear-gradient(to right, #FFDEE9, #B5FFFC)",
    minHeight: "100vh",
    color: "#333",
    fontFamily: "'Segoe UI', sans-serif",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.8rem",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#222",
  },
  subtext: {
    fontSize: "1.1rem",
    marginBottom: "40px",
    opacity: 0.8,
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "25px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#ffffff",
    color: "#333",
    padding: "18px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
    textAlign: "left",
    cursor: "pointer",
    overflow: "hidden",
  },
  cardHover: {
    transform: "translateY(-6px) scale(1.015)",
    boxShadow: "0 10px 22px rgba(0, 0, 0, 0.15)",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "8px",
  },
  cardDesc: {
    fontSize: "0.95rem",
    marginBottom: "10px",
    lineHeight: 1.4,
    opacity: 0.9,
  },
  contentBox: {
    overflow: "hidden",
    transition: "max-height 0.4s ease, opacity 0.4s ease",
  },
  contentHeading: {
    fontSize: "0.98rem",
    fontWeight: "600",
    marginBottom: "5px",
    color: "#444",
  },
  contentList: {
    paddingLeft: "16px",
    margin: 0,
    listStyleType: "disc",
  },
  contentItem: {
    fontSize: "0.88rem",
    marginBottom: "3px",
    opacity: 0.85,
  },
};
