import { useState, useEffect } from "react";
import axios from "axios";

export default function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to view courses");
      return;
    }

    axios.get("http://localhost:5000/api/courses", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setCourses(res.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load courses");
      });
  }, []);

  const enroll = async (courseId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to enroll");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/enrollments",
        { course: courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Enrolled successfully");
    } catch (err) {
      // console.error(err);
      const message =
        err.response?.data?.message || "Enrollment failed";
      alert(message);
    }
};

return (
  <div style={styles.container}>
    <h2 style={styles.heading}>📚 Available Courses</h2>

    {courses.length === 0 && <p>No courses available.</p>}

    {courses.map((course) => (
      <div key={course._id} style={styles.card}>
        <h3 style={styles.title}>{course.title}</h3>
        <p style={styles.description}>{course.description}</p>
        <button onClick={() => enroll(course._id)} style={styles.button}>
          Enroll Now
        </button>
      </div>
    ))}
  </div>
);
}

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "30px",
    color: "#2c3e50",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    transition: "transform 0.2s",
  },
  title: {
    margin: "0 0 10px",
    fontSize: "1.4rem",
    color: "#34495e",
  },
  description: {
    marginBottom: "10px",
    fontSize: "1rem",
    color: "#555",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#2980b9",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
