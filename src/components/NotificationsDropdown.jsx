import { useState, useEffect, useRef } from "react";
import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function NotificationsDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const fetchNotifications = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await fetch("http://localhost:5000/api/notifications", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          setNotifications(data);
          setHasViewed(true);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };

      fetchNotifications();
    }
  }, [isOpen]);

  // Close dropdown if click is outside button or dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (courseId) => {
    navigate(`/courses`);
  };

  return (
    <div style={{ position: "relative", fontFamily: "Arial, sans-serif" }}>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        style={{
          background: "#333",
          border: "none",
          cursor: "pointer",
          fontSize: "1.5rem",
          position: "relative",
          color: "white",
          padding: "6px 8px",
          borderRadius: "4px",
        }}
        aria-label="Toggle Notifications"
      >
        <FiBell />
        {notifications.length > 0 && !hasViewed && (
          <span
            style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              background: "#d32f2f",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "0.65rem",
              fontWeight: "600",
              userSelect: "none",
            }}
          >
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            right: 0,
            marginTop: "8px",
            backgroundColor: "#fff",
            color: "#222",
            borderRadius: "6px",
            width: "280px",
            boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
            zIndex: 1000,
            maxHeight: "350px",
            overflowY: "auto",
            border: "1px solid #ccc",
          }}
        >
          <h4
            style={{
              padding: "12px 16px",
              margin: 0,
              fontSize: "1rem",
              fontWeight: "600",
              borderBottom: "1px solid #ddd",
              backgroundColor: "#f7f7f7",
              borderTopLeftRadius: "6px",
              borderTopRightRadius: "6px",
            }}
          >
            Notifications
          </h4>
          {notifications.length === 0 ? (
            <p
              style={{
                padding: "16px",
                fontSize: "0.9rem",
                color: "#666",
                textAlign: "center",
                margin: 0,
              }}
            >
              No new notifications
            </p>
          ) : (
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: "10px 16px",
              }}
            >
              {notifications.map((n) => (
                <li
                  key={n._id}
                  style={{
                    marginBottom: "12px",
                    paddingBottom: "8px",
                    borderBottom: "1px solid #eee",
                    fontSize: "0.9rem",
                    color: "#333",
                    cursor: "pointer",
                  }}
                  onClick={() => handleNotificationClick(n.course?._id)}
                >
                  <strong style={{ color: "#111" }}>
                    {n.course?.title || "Untitled Course"}
                  </strong>{" "}
                  – {n.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
