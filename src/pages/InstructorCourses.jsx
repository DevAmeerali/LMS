import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function InstructorCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/courses/instructor", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch instructor's courses");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🎓 Your Courses</h2>
      <ul style={styles.courseList}>
        {courses.map((course) => (
          <li key={course._id} style={styles.courseItem}>
            <div>
              <strong>{course.title}</strong> <br />
              <small>{course.description}</small>
            </div>
            <Link to={`/edit-course/${course._id}`} style={styles.editButton}>
              ✏️ Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "3rem auto",
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
    color: "#2c3e50",
    textAlign: "center",
  },
  courseList: {
    listStyle: "none",
    padding: 0,
  },
  courseItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    borderBottom: "1px solid #eee",
  },
  editButton: {
    textDecoration: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    fontSize: "0.9rem",
  },
};
