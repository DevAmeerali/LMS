import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import NotificationsDropdown from "../components/NotificationsDropdown";
import { AuthContext } from "../AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(false);

  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setShowProfile(false);
  }, [user]);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showProfile &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  const toggleProfile = () => setShowProfile(!showProfile);

  return (
    <nav style={styles.nav}>
      <div style={styles.logoContainer}>
        {!user && <Link to="/" style={styles.logo}>MyLMS</Link>}
      </div>

      {/* <div style={styles.links}>
        {user && (
          <>
            {user.role === "student" && (
              <>
                <Link to="/profile" style={styles.link}>My Profile</Link>
                <Link to="/student-dashboard" style={styles.link}>Home</Link>
                <Link to="/courses" style={styles.link}>Courses</Link>
                <Link to="/enrollments" style={styles.link}>Enrollments</Link>
              </>
            )}
            {user.role === "instructor" && (
              <>
                <Link to="/profile" style={styles.link}>My Profile</Link>
                <Link to="/instructor-dashboard" style={styles.link}>Dashboard</Link>
                <Link to="/instructor/courses" style={styles.link}>Manage Courses</Link>
              </>
            )}
          </>
        )}
      </div> */}

      <div style={styles.right}>
        {user && user.role === "student" && <NotificationsDropdown />}

        {user ? (
          <>
            <div
              style={styles.avatar}
              onClick={toggleProfile}
              ref={avatarRef}
            >
              <VscAccount size={24} color="#fff" />
            </div>
            {showProfile && (
              <div style={styles.dropdown} ref={dropdownRef}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <button onClick={logout} style={styles.logout}>Logout</button>
              </div>
            )}
          </>
        ) : (
          <Link to="/login" style={styles.loginButton}>Login</Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    padding: "1rem 2rem",
    backgroundColor: "#333",
    borderBottom: "1px solid #ccc",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  logoContainer: {
    flex: "1",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "white",
    textDecoration: "none",
  },
  right: {
    flex: "1",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
  },
  loginButton: {
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#C33764",
    padding: "0.5rem 1.2rem",
    borderRadius: "6px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    top: "55px",
    right: "0",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    zIndex: 1000,
    textAlign: "left",
    width: "200px",
  },
  logout: {
    marginTop: "0.5rem",
    padding: "0.5rem",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
  },
};
