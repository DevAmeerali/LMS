import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [profilePic, setProfilePic] = useState(null);
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setUser(res.data);
        setForm({ name: res.data.name, email: res.data.email });
      });
  }, []);

  const handleEdit = () => setEditing(true);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      const res = await axios.put("http://localhost:5000/api/user/profile", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
      setEditing(false);
    } catch (err) {
      alert("Update failed");
    }
  };

  const handlePasswordChange = async () => {
    try {
      await axios.put("http://localhost:5000/api/user/change-password", passwords, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Password changed");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (err) {
      alert("Password change failed");
    }
  };

  const handlePicUpload = async e => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await axios.post("http://localhost:5000/api/user/upload-profile-pic", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      setUser(res.data);
    } catch (err) {
      alert("Image upload failed");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2>Profile</h2>
      
      <div style={styles.imageWrapper}>
        <img
          src={`http://localhost:5000${user.profilePicture || "/default.png"}`}
          alt="Profile"
          style={styles.image}
        />
      </div>

      <input type="file" onChange={handlePicUpload} />

      {editing ? (
        <> 
          <input name="name" value={form.name} onChange={handleChange} style={styles.input} />
          <input name="email" value={form.email} onChange={handleChange} style={styles.input} />
          <button onClick={handleUpdate} style={styles.button}>Save</button>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={handleEdit} style={styles.button}>Edit Profile</button>
        </>
      )}

      <hr />
      <h3>Change Password</h3>
      <input
        type="password"
        placeholder="Current Password"
        value={passwords.currentPassword}
        onChange={e => setPasswords({ ...passwords, currentPassword: e.target.value })}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="New Password"
        value={passwords.newPassword}
        onChange={e => setPasswords({ ...passwords, newPassword: e.target.value })}
        style={styles.input}
      />
      <button onClick={handlePasswordChange} style={styles.button}>Change Password</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "2rem auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fefefe"
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem"
  },
  image: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem"
  },
  button: {
    padding: "0.75rem 1rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};
