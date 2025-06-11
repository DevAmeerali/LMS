import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Enrollments() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user._id) {
          alert("User not logged in.");
          return;
        }

        const token = localStorage.getItem("token");
        // const studentId = user._id;

        const res = await axios.get(`http://localhost:5000/api/enrollments`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCourses(res.data);
      } catch (err) {
        console.error(err);
        alert("Could not fetch enrollments.");
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🎓 Your Enrolled Courses</h2>

      {courses.length === 0 ? (
        <p>You are not enrolled in any courses.</p>
      ) : (
        <ul style={styles.list}>
          {courses.map((enrollment) => {
            const course = enrollment.course;

            return (
              <li key={enrollment._id} style={styles.listItem}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <Link
                  to={`/course/${course._id}`}
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    padding: "8px 16px",
                    backgroundColor: "#3498db",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#2980b9")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#3498db")}
                >
                  View Course
                </Link>


                {/* {course.content?.length > 0 && (
                  <ul style={{ paddingLeft: "1rem" }}>
                    {course.content.map((section) => (
                      <li key={section._id}>{section.title}</li>
                    ))}
                  </ul>
                )} */}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "1.8rem",
    color: "#2c3e50",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
};
