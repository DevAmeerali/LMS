import { useState } from 'react';
import axios from 'axios';

export default function AddCourse() {
  const [course, setCourse] = useState({ title: "", description: "", price: "" });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/courses",
        course,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Course Added");
      setCourse({ title: "", description: "", price: "" });
    } catch (error) {
      alert("Failed to add Course");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Add New Course</h2>
      <input
        name="title"
        placeholder="Course Title"
        value={course.title}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        name="description"
        placeholder="Course Description"
        value={course.description}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        name="price"
        placeholder="Course Price (USD)"
        value={course.price}
        type="number"
        onChange={handleChange}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Add Course</button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: "500px",
    margin: "3rem auto",
    padding: "2rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
    backgroundColor: "#fdfdfd"
  },
  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#2c3e50"
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px"
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};
