import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditCourse() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [newContent, setNewContent] = useState({ title: "", body: "" });

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:5000/api/courses/${courseId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCourse(res.data);
            } catch (err) {
                console.error(err);
                alert("Failed to load course");
                navigate("/instructor/courses");
            }
        };

        fetchCourse();
    }, [courseId, navigate]);

    const handleAddContent = async () => {
        if (!newContent.title.trim() || !newContent.body.trim()) {
            return alert("Both fields are required");
        }

        try {
            const token = localStorage.getItem("token");

            console.log("Sending content:", newContent);

            const res = await axios.put(
                `http://localhost:5000/api/courses/${courseId}/content`,
                newContent,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCourse(res.data);
            setNewContent({ title: "", body: "" });
        } catch (err) {
            console.error(err);
            alert("Failed to add content");
        }
    };

    const handleDeleteContent = async (contentId) => {
        if (!window.confirm("Are you sure you want to delete this section?")) return;

        try {
            const token = localStorage.getItem("token");
            const res = await axios.delete(
                `http://localhost:5000/api/courses/${courseId}/content/${contentId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCourse(res.data);
        } catch (err) {
            console.error(err);
            console.error("Error response:", err.response?.data || err.message);
            alert("Failed to add content: " + (err.response?.data?.message || err.message));
        }
    };

    if (!course) return <p>Loading...</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>📝 Editing: {course.title}</h2>

            <div style={styles.form}>
                <input
                    type="text"
                    placeholder="Section Title"
                    value={newContent.title}
                    onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                    style={styles.input}
                />
                <textarea
                    placeholder="Section Body"
                    value={newContent.body}
                    onChange={(e) => setNewContent({ ...newContent, body: e.target.value })}
                    style={styles.textarea}
                />
                <button onClick={handleAddContent} style={styles.button}>➕ Add Section</button>
            </div>

            <h3 style={styles.subheading}>📄 Existing Sections</h3>
            {course.content.map((item) => (
                <div key={item._id} style={styles.card}>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                    <button onClick={() => handleDeleteContent(item._id)} style={styles.deleteButton}>
                        🗑️ Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "800px",
        margin: "3rem auto",
        padding: "2rem",
        backgroundColor: "#fdfdfd",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    heading: {
        fontSize: "1.6rem",
        marginBottom: "1.5rem",
        color: "#2c3e50",
    },
    form: {
        marginBottom: "2rem",
    },
    input: {
        width: "100%",
        padding: "10px",
        fontSize: "1rem",
        marginBottom: "1rem",
        borderRadius: "6px",
        border: "1px solid #ccc",
    },
    textarea: {
        width: "100%",
        padding: "10px",
        fontSize: "1rem",
        height: "100px",
        marginBottom: "1rem",
        borderRadius: "6px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "10px 16px",
        backgroundColor: "#2ecc71",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
    subheading: {
        fontSize: "1.2rem",
        marginBottom: "1rem",
        color: "#333",
    },
    card: {
        backgroundColor: "#f5f5f5",
        padding: "1rem",
        borderRadius: "6px",
        marginBottom: "1rem",
    },
    deleteButton: {
        backgroundColor: "#e74c3c",
        color: "#fff",
        padding: "6px 12px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};
