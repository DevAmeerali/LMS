import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import  {AuthContext}  from "../AuthContext";

export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const { setUser } = useContext(AuthContext);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setUser(res.data.user);
            if (res.data.user.role === "instructor") {
                navigate("/instructor-dashboard");
            } else {
                navigate("/student-dashboard");
            }
        } catch (error) {
            console.error(error)
            alert(error.response?.data?.error || "Login failed");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.heading}>Login</h2>
            <input
                name="email"
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
                required
                style={styles.input}
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
                style={styles.input}
            />
            <div style={styles.forgotPasswordContainer}>
                <Link to="/forgot-password" style={styles.forgotPasswordLink}>
                    Forgot Password?
                </Link>
            </div>

            <button type="submit" style={styles.button}>Login</button>
        </form>
    );
}

const styles = {
    form: {
        maxWidth: "400px",
        margin: "3rem auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
        backgroundColor: "#f9f9f9",
    },
    heading: {
        textAlign: "center",
        marginBottom: "1.5rem",
        color: "#333",
    },
    input: {
        width: "100%",
        marginBottom: "1rem",
        padding: "0.75rem",
        fontSize: "1rem",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    forgotPasswordContainer: {
        textAlign: "right",
        marginBottom: "1rem",
    },
    forgotPasswordLink: {
        fontSize: "0.9rem",
        color: "#007bff",
        textDecoration: "none",
    },
    button: {
        width: "100%",
        padding: "0.75rem",
        fontSize: "1rem",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    }
};
