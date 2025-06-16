import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CourseContentPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No auth token found");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/courses/${courseId}`,
          config
        );
        setCourse(data);
      } catch (err) {
       console.error("Error fetching course:", err);
      }
    };

    const fetchProgress = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/progress/${courseId}`,
          config
        );
        setProgress(data.completedSections);
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };

    fetchCourse();
    fetchProgress();
  }, [courseId, navigate]);

  useEffect(() => {
    if (course && course.content.length > 0) {
      const completed = progress.length === course.content.length;
      setIsCompleted(completed);
    }
  }, [course, progress]);

  const toggleSection = async (sectionId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No auth token found");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/progress/${courseId}/toggle/${sectionId}`,
        {},
        config
      );
      setProgress(data.completedSections);
    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  const getProgressPercentage = () => {
    if (!course || course.content.length === 0) return 0;
    return Math.round((progress.length / course.content.length) * 100);
  };

  const handleDownloadCertificate = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in.");

    try {
      const response = await axios.get(
        `http://localhost:5000/api/certificates/download/${courseId}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "certificate.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to download certificate:", err);
      alert("Failed to download certificate.");
    }
  };

  if (!course) return <div>Loading course...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{course.title}</h2>
      <p style={styles.description}>{course.description}</p>
      <div style={styles.progressBarContainer}>
        <div
          style={{ ...styles.progressBarFill, width: `${getProgressPercentage()}%` }}
        >
          <span style={styles.progressBarText}>{getProgressPercentage()}%</span>
        </div>
      </div>

      {isCompleted && (
        <button
          onClick={handleDownloadCertificate}
          style={{
            margin: "1.5rem auto",
            display: "block",
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
            fontWeight: "600",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          🎓 Download Certificate
        </button>
      )}

      <ul style={styles.sectionList}>
        {course.content.map((section) => {
          const isChecked = progress.includes(section._id);
          return (
            <li
              key={section._id}
              style={{
                ...styles.sectionItem,
                ...(isChecked ? styles.sectionItemChecked : {}),
              }}
              onClick={() => toggleSection(section._id)}
            >
              <label style={styles.label}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleSection(section._id)}
                  style={{
                    ...styles.checkbox,
                    ...(isChecked ? styles.checkboxChecked : {}),
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                {section.title}
              </label>
              <p style={styles.sectionText}>{section.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// ✅ Unchanged styling
const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
    color: "#222",
    textAlign: "center",
  },
  description: {
    fontSize: "1.1rem",
    marginBottom: "2rem",
    color: "#555",
    textAlign: "center",
    lineHeight: 1.6,
  },
  progressBarContainer: {
    width: "100%",
    maxWidth: "500px",
    height: "16px",
    backgroundColor: "#f1f1f1",
    borderRadius: "20px",
    margin: "0 auto 2.5rem auto",
    overflow: "hidden",
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  progressBarFill: {
    height: "100%",
    background: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
    borderRadius: "20px",
    transition: "width 0.4s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: "12px",
  },
  progressBarText: {
    color: "#fff",
    userSelect: "none",
  },
  sectionList: {
    listStyle: "none",
    padding: 0,
  },
  sectionItem: {
    marginBottom: "1.8rem",
    padding: "1rem 1.5rem",
    borderRadius: "10px",
    backgroundColor: "#f9faff",
    boxShadow: "0 3px 8px rgba(0,0,0,0.05)",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
  },
  sectionItemChecked: {
    backgroundColor: "#d7f0ff",
    textDecoration: "line-through",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#222",
  },
  checkbox: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
    accentColor: "#00c6ff",
    transition: "transform 0.2s ease",
  },
  checkboxChecked: {
    transform: "scale(1.2)",
  },
  sectionText: {
    marginTop: "0.5rem",
    marginLeft: "32px",
    color: "#444",
    lineHeight: 1.5,
  },
};

export default CourseContentPage;
