import { Outlet, Link } from "react-router-dom";

export default function DashboardLayout() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f0f4f8" }}>
      {/* Sidebar */}
      <nav
        style={{
          width: "260px",
          backgroundColor: "#1e293b", // dark blue-gray
          color: "#e2e8f0", // light gray text
          padding: "2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <h3
          style={{
            marginBottom: "2rem",
            fontSize: "1.8rem",
            fontWeight: "700",
            color: "#60a5fa", // bright blue
            textAlign: "center",
          }}
        >
          Dashboard
        </h3>
        <ul style={{ listStyle: "none", padding: 0, flexGrow: 1 }}>
          {user?.role === "student" && (
            <>
              <li style={{ marginBottom: "1rem" }}>
                <Link
                  to="/student-dashboard"
                  style={linkStyle}
                  onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
                  onMouseLeave={(e) => (e.target.style.color = "#e2e8f0")}
                >
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <Link
                  to="/courses"
                  style={linkStyle}
                  onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
                  onMouseLeave={(e) => (e.target.style.color = "#e2e8f0")}
                >
                  Courses
                </Link>
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <Link
                  to="/enrollments"
                  style={linkStyle}
                  onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
                  onMouseLeave={(e) => (e.target.style.color = "#e2e8f0")}
                >
                  My Enrollments
                </Link>
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <Link
                  to="/profile"
                  style={linkStyle}
                  onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
                  onMouseLeave={(e) => (e.target.style.color = "#e2e8f0")}
                >
                  Profile
                </Link>
              </li>
            </>
          )}
          {user?.role === "instructor" && (
            <>
              <li style={{ marginBottom: "1rem" }}>
                <Link
                  to="/instructor-dashboard"
                  style={linkStyle}
                  onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
                  onMouseLeave={(e) => (e.target.style.color = "#e2e8f0")}
                >
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <Link
                  to="/add-course"
                  style={linkStyle}
                  onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
                  onMouseLeave={(e) => (e.target.style.color = "#e2e8f0")}
                >
                  Add Course
                </Link>
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <Link
                  to="/instructor/courses"
                  style={linkStyle}
                  onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
                  onMouseLeave={(e) => (e.target.style.color = "#e2e8f0")}
                >
                  My Courses
                </Link>
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <Link
                  to="/profile"
                  style={linkStyle}
                  onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
                  onMouseLeave={(e) => (e.target.style.color = "#e2e8f0")}
                >
                  Profile
                </Link>
              </li>
            </>
          )}
          {/* <li style={{ marginTop: "auto" }}>
            <Link
              to="/"
              onClick={() => localStorage.clear()}
              style={{ ...linkStyle, color: "#ef4444", fontWeight: "600" }}
              onMouseEnter={(e) => (e.target.style.color = "#b91c1c")}
              onMouseLeave={(e) => (e.target.style.color = "#ef4444")}
            >
              Logout
            </Link>
          </li> */}
        </ul>
      </nav>

      {/* Main content */}
      <main
        style={{
          flexGrow: 1,
          padding: "2.5rem 3rem",
          backgroundColor: "white",
          borderRadius: "8px",
          margin: "1.5rem",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.05)",
          minHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

const linkStyle = {
  color: "#e2e8f0",
  textDecoration: "none",
  fontSize: "1.1rem",
  display: "block",
  padding: "0.5rem 0.75rem",
  borderRadius: "6px",
  transition: "color 0.3s ease",
};
